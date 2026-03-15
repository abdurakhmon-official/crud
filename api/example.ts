function createCounter(initialValue = 0) {
  let count = initialValue;

  return {
    getCount() {
      return count;
    },
    inrement() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
  };
}

function getUser(userId: string, callback: any) {
  setTimeout(() => {
    console.log(`User ${userId} received!`);
    callback({ id: userId, name: "Abdurakhmon" });
  }, 1000);
}

function getPosts(userId: string, callback: any) {
  setTimeout(() => {
    console.log(`Posts for user ${userId} received!`);
    callback(["Post1", "Post2"]);
  }, 1000);
}

function getComments(postId: string, callback: any) {
  setTimeout(() => {
    console.log(`Comments for ${postId} received!`);
    callback(["Comment1", "Comment2"]);
  }, 1000);
}

getUser("123", (user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0], (comments) => {
      console.log("Final Comments:", comments);
    });
  });
});

const counter = createCounter(5);
console.log(counter.inrement());
console.log(counter.decrement());
console.log(counter.getCount());
