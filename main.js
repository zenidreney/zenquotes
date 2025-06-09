import { tweetsData } from "./data.js";
import { render } from "./renderFeed.js";
// Alternative path is in the script tag of the html.
//import { v4 as uuidv4 } from "https://jspm.dev/uuid"; 
//console.log(uuidv4());


const savedTweetData = localStorage.getItem("tweetsData");

/*Load from Local Storage*/

if(savedTweetData) {
    const parsedTweets = JSON.parse(savedTweetData);
    tweetsData.length = 0;
    
    parsedTweets.forEach(function(tweet){
        tweetsData.push(tweet);
        
    });
}

/*Event Listeners*/

document.addEventListener("click", function (e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like);
    } else if (e.target.dataset.share) {
        handleRetweetClick(e.target.dataset.share);
    } else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply);
    } else if (e.target.id === "tweet-btn") {
        handleTweetBtnClick();
    } else if (e.target.dataset.replyBtn) {
        handleReplyBtnClick(e.target.dataset.replyBtn);
    } else if (e.target.dataset.deleteTweet) {
        handleDeleteTweet(e.target.dataset.deleteTweet);
    } else if (e.target.dataset.deleteReply) {
        handleDeleteReply(e.target.dataset.deleteReplyParent, e.target.dataset.deleteReply);
    }
});

/*Functions*/

function saveToLocalStorage() {
    
    localStorage.setItem("tweetsData", JSON.stringify(tweetsData));
    
}

function handleTweetBtnClick() {
    const tweetInput = document.getElementById("tweet-input");

    if (tweetInput.value) {
        tweetsData.unshift({
            handle: `@Zenid`,
            profilePic: `media/user-avatar.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            isTweeted: true,
            uuid: uuidv4()
        });
        
        saveToLocalStorage();
        render(tweetsData);
        tweetInput.value = "";
    }
}

function handleDeleteTweet(tweetId) {
    const targetTweetIndex = tweetsData.findIndex(function(tweet){
        
        return tweet.uuid === tweetId;
        
    });
    
    //console.log(targetTweetIndex);
    
    if (targetTweetIndex !== -1){
        
        tweetsData.splice(targetTweetIndex, 1);
        
        saveToLocalStorage();
        render(tweetsData);
        
    }
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId;
    })[0];

    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--;
    } else {
        targetTweetObj.likes++;
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked;
    
    
    saveToLocalStorage();
    render(tweetsData);
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId;
    })[0];

    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--;
    } else {
        targetTweetObj.retweets++;
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
    
    saveToLocalStorage();
    render(tweetsData);
}

function handleReplyBtnClick(tweetId){
    
    const replyTextInput = document.getElementById(`reply-input-${tweetId}`);
    
    if(replyTextInput.value){
        const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId;
    })[0];
     
        targetTweetObj.replies.unshift({
            
            handle: `@Zenid`,
            profilePic: `media/user-avatar.jpg`,
            tweetText: replyTextInput.value,
            isReplies: true,
            uuid: uuidv4()
            
            
        });
        
        saveToLocalStorage();
        render(tweetsData);
        
        //console.log(targetTweetObj.uuid);
        
        replyTextInput.value = "";
        
        const repliesContainer = document.getElementById(`replies-${tweetId}`);
        repliesContainer.classList.remove("hidden");
    }

}

function handleDeleteReply(parentTweetId, replyId) {
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === parentTweetId;
        
    })[0];
    
    if(targetTweetObj){
        const replyIndex = targetTweetObj.replies.findIndex(function(reply){
            
           return reply.uuid === replyId; 
        });
        
        if(replyIndex !== -1) {
            
            targetTweetObj.replies.splice(replyIndex, 1);
            
            saveToLocalStorage();
            render(tweetsData);
        }
        
    }
    
}

render(tweetsData);
