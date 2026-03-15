// import { USER_ROLE } from "@prisma/client"
import { Context, Req } from "@tsed/common"
import { useDecorators } from "@tsed/core"
import { Forbidden, Unauthorized } from "@tsed/exceptions"
import { MiddlewareMethods, UseAuth } from "@tsed/platform-middlewares"
import { In, Returns } from "@tsed/schema"
import { Request } from "express"
import * as jwt from 'jsonwebtoken'
import prisma from "../utils/db"

export class AuthMiddleware implements MiddlewareMethods {
    public async use(@Req() request: Request, @Context() ctx: Context) {
        const options = ctx.endpoint.get(AuthMiddleware) || {}

        await getUser(request)

        if (!request.user) {
            throw new Unauthorized("Unauthorized!")
        }

        if (request.user.role === "ADMIN") {
            return true
        }

        if (options.role) {
            if (request.user.role !== options.role) {
                throw new Forbidden("You are not authorized to access this resource!")
            }
        }
    }
}

async function getUser(request:Request) {
    const token = request.token
    if (!token) {
        throw new Unauthorized('Unauthorized!')
    }

    try {
        const payload: any = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await prisma.user.findUnique({
            where: { id: payload.id },
            select: {
                id: true,
                firstName: true,
                email: true,
                role: true,
                active: true
            }
        })

        if (!user) {
            throw new Unauthorized("Unauthorized!")
        }

        request.user = user
    } catch (error: any) {
        console.error(error.message)
    }
}

type RoleRequirement = {
    role: {ADMIN: any, USER: any, SUPER: any}
}

export function Authenticate(role = "USER") {
    return {role}
}

export function Authorized(options: RoleRequirement): Function {
    return useDecorators(
        UseAuth(AuthMiddleware, options),
        In("header").Name('Authorization').Required(true),
        Returns(401), 
        Returns(403)
    )
}










// // import { useDecorators } from '@tsed/core'
// // import { USER_ROLE } from '../utils/helper'
// // import { MiddlewareMethods, UseAuth } from '@tsed/platform-middlewares'
// // import { In, Name, Returns } from '@tsed/schema'
// // import { Req } from '@tsed/common'
// // import { Request } from 'express'
// // import {Context} from '@tsed/platform-params'
// // import { Forbidden, Unauthorized } from '@tsed/exceptions'
// // import * as jwt from 'jsonwebtoken'
// // import prisma from '../utils/db'

// import { USER_ROLE } from "@prisma/client";
// import { Req } from "@tsed/common";
// import { useDecorators } from "@tsed/core";
// import { Forbidden, Unauthorized } from "@tsed/exceptions";
// import { MiddlewareMethods, UseAuth } from "@tsed/platform-middlewares";
// import { Context } from "@tsed/platform-params";
// import { In, Returns } from "@tsed/schema";
// import { Request } from "express";
// import * as jwt from 'jsonwebtoken'
// import prisma from "../utils/db";

// // export class AuthMiddleware implements MiddlewareMethods {
// //     public async use(@Req() request: Request, @Context() ctx: Context) {
// //         const options = ctx.endpoint.get(AuthMiddleware) || {}

// //         await getUser(request)

// //         if (!request.user) {
// //             throw new Unauthorized("Unauthorized")
// //         }

// //         if (request.user.role === USER_ROLE.ADMIN) {
// //             return true
// //         }

// //         if (options.role) {
// //             if (request.user.role !== options.role) {
// //                 throw new Forbidden('You are not authorized to access this resourse.')
// //             }
// //         }
        
// //     }
// // }

// // async function getUser(request: Request) {
// //     const token = request.token
// //     if (!token) {
// //         throw new Unauthorized('Unauthorized')
// //     }

// //     try {
// //         const payload: any = jwt.verify(token, process.env.JWT_SECRET)

// //         const user = await prisma.user.findUnique({
// //             where: { id: payload.id },
// //             select: {
// //                 id: true,
// //                 firstName: true,
// //                 lastName: true,
// //                 email: true,
// //                 active: true,
// //                 role: true,
// //                 profileImage: true
// //             }
// //         })

// //         if (!user) {
// //             throw new Unauthorized("Unauthorized")
// //         }

// //         request.user = user
// //     } catch (error: any) {
// //         console.error('error.message', error.message)
// //     }
// // }

// // type RoleRequirement = {
// //     role: USER_ROLE
// // }

// // export function Authenticate(role: USER_ROLE = USER_ROLE.USER): RoleRequirement {
// //     return {role}
// // }

// // export function Authorized(options: RoleRequirement): Function {
// //   return useDecorators(
// //     UseAuth(AuthMiddleware, options),
// //     In("header").Name("Authorization").Type(String).Required(true),
// //     Returns(401),
// //     Returns(403)
// //   );
// // }

// export class AuthMiddleware implements MiddlewareMethods {
//     public async use(@Req() request: Request, @Context() ctx: Context) {
//         const options = ctx.endpoint.get(AuthMiddleware) || {}

//         await getUser(request)

//         if (!request.user) {
//             throw new Unauthorized("Unauthorized!")
//         }

//         if (request.user.role === USER_ROLE.ADMIN) {
//             return true
//         }

//         if (options.role) {
//             if (request.user.role !== options.role) {
//                 throw new Forbidden('You are not authenticated to access this resource')
//             }
//         }
//     }
// }

// async function getUser(request:Request) {
//     const token = request.token
//     if (!token) {
//         throw new Unauthorized('Unauthorized')
//     }

//     try {
//         const payload: any = jwt.verify(token, process.env.JWT_SECRET)

//         const user = await prisma.user.findUnique({
//             where: { id: payload.id },
//             select: {
//                 id: true,
//                 firstName: true,
//                 email: true,
//                 role: true,
//                 active: true,
//             }
//         })

//         if (!user) {
//             throw new Unauthorized("Unauthorized")
//         }

//         request.user = user
//     } catch (error: any) {
//         console.error(error.message)
//     }
// }


// type RoleRequirement = {
//     role: USER_ROLE
// }

// export function Authenticate(role: USER_ROLE = USER_ROLE.USER) {
//     return {role}
// }

// export function Authorized(options: RoleRequirement): Function {
//     return useDecorators(
//         UseAuth(AuthMiddleware, options),
//         In('header').Name('Authorization').Required(true),
//         Returns(401),
//         Returns(403)
//     )
// }
