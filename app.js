import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

document.addEventListener("click", function (e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like);
    } else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet);
    } else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply);
    } else if (e.target.id === "tweet-btn") {
        handleTweetBtnClick();
    }
});

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
    render();
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
    render();
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

function handleTweetBtnClick() {
    const tweetInput = document.getElementById("tweet-input");

    if (tweetInput.value) {
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `media/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        });
        render();
        tweetInput.value = "";
    }
}

function getFeedHtml() {
    const feedHtml = document.createElement("div");
    
    tweetsData.forEach(function(tweet){
        
        /*Feed Container*/
        
        const tweetDiv = document.createElement("div");
        tweetDiv.className = "tweet";
            const tweetInner = document.createElement("div");
            tweetInner.className = "tweet-inner";
        
                const profilePic = document.createElement("img");
                profilePic.src = tweet.profilePic;
                profilePic.className = "profile-pic";
                
                const tweetContentDiv = document.createElement("div");
                
                    const tweetHandle = document.createElement("p");
                    tweetHandle.className = "handle";
                    tweetHandle.textContent = tweet.handle;
        
                    const tweetText = document.createElement("p");
                    tweetText.className = "tweet-text";
                    tweetText.textContent = tweet.tweetText;
        
                    const iconsDiv = document.createElement("div");
                    iconsDiv.className = "tweet-details";
                        const commentsContainer = document.createElement("span");
                        commentsContainer.className = "tweet-detail";
        
                            const repliesIcon = document.createElement("i");
                            repliesIcon.className = "fa-regular fa-comment-dots";
                            repliesIcon.setAttribute("data-reply", tweet.uuid);
                            //console.log(repliesIcon.dataset.reply);
                            
                            const repliesCount = document.createElement("div");
                            repliesCount.textContent = tweet.replies.length;
        
                            commentsContainer.append(repliesIcon, repliesCount);
        
                        
                        const likesContainer = document.createElement("span");
                        likesContainer.className = "tweet-detail";
        
                            const likesIcon = document.createElement("i");
                            likesIcon.className = "fa-solid fa-heart";
                            likesIcon.setAttribute("data-like", tweet.uuid);
                            //console.log(likesIcon.dataset.like);
                            
                            const likesCount = document.createElement("div");
                            likesCount.textContent = tweet.likes;
        
                        likesContainer.append(likesIcon, likesCount);
        
                        const shareContainer = document.createElement("span");
                        shareContainer.className = "tweet-detail";
        
                            const shareIcon = document.createElement("i");
                            shareIcon.className = "fa-solid fa-retweet";
                            shareIcon.setAttribute("data-share", tweet.uuid);
                            //console.log(shareIcon.dataset.share);
                            
                            const shareCount = document.createElement("div");
                            shareCount.textContent = tweet.retweets;
        
                        shareContainer.append(shareIcon, shareCount);
        
                    iconsDiv.append(commentsContainer, likesContainer, shareContainer);
        
                tweetContentDiv.append(tweetHandle, tweetText, iconsDiv);
            tweetInner.append(profilePic, tweetContentDiv);
        
        /*Replies Container*/
        
        
        const repliesContainer = document.createElement("div");
        repliesContainer.className = "hidden";
        repliesContainer.id = "replies-" + tweet.uuid;
        //console.log(repliesContainer.id)
        
            if(tweet.replies.length > 0){

                tweet.replies.forEach(function(reply){
                    
                    const repliesDiv = document.createElement("div");
                    repliesDiv.className = "tweet-reply";
                        
                    
                            const tweetReplyInner = document.createElement("div");
                            tweetReplyInner.className = "tweet-inner";           
                    
                                const replyAvatar = document.createElement("img");
                                replyAvatar.src = reply.profilePic;
                                replyAvatar.className = "profile-pic";

                                const replyTextContainer = document.createElement("div");

                                    const replyHandle = document.createElement("p");
                                    replyHandle.className = "handle";
                                    replyHandle.textContent = reply.handle;

                                    const replyText = document.createElement("p");
                                    replyText.className = "tweet-text";
                                    replyText.textContent = reply.tweetText;

                                replyTextContainer.append(replyHandle, replyText);


                            tweetReplyInner.append(replyAvatar, replyTextContainer);
                
            
                    repliesDiv.append(tweetReplyInner);
                
        repliesContainer.append(repliesDiv);
            
            });       
            
        }
        
        tweetDiv.append(tweetInner, repliesContainer);
        
    feedHtml.append(tweetDiv);
        
    });
    
   
    return feedHtml;
}

function render() {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";
    feed.append(getFeedHtml());
    
    
    //document.getElementById("feed").innerHTML = getFeedHtml();
}

render();
