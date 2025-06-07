import { tweetsData } from "./data.js";
//import { v4 as uuidv4 } from "https://jspm.dev/uuid"; // Alternative path is in the script tag of the html.
//console.log(uuidv4());

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
    }
});

function handleDeleteTweet(tweetId) {
    const targetTweetIndex = tweetsData.findIndex(function(tweet){
        
        return tweet.uuid === tweetId;
        
    });
    
    //console.log(targetTweetIndex);
    
    if (targetTweetIndex !== -1){
        
        tweetsData.splice(targetTweetIndex, 1);
        render();
        
    }
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
            isTweeted: true,
            uuid: uuidv4()
        });
        render();
        tweetInput.value = "";
    }
}

function handleReplyBtnClick(tweetId){
    
    const replyTextInput = document.getElementById(`reply-input-${tweetId}`);
    
    
    
    if(replyTextInput.value){
        const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId;
    })[0];
     
        targetTweetObj.replies.unshift({
            
            handle: `@Scrimba`,
            profilePic: `media/scrimbalogo.png`,
            tweetText: replyTextInput.value,
            isReplies: true,
            uuid: uuidv4()
            
            
        });
        
        render();
        
        //console.log(targetTweetObj.uuid);
        
        replyTextInput.value = "";
        
        const repliesContainer = document.getElementById(`replies-${tweetId}`);
        repliesContainer.classList.remove("hidden");
        
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
                            
                                if(tweet.isLiked){
                                    likesIcon.className = "fa-solid fa-heart liked";
                                }
        
                            likesIcon.setAttribute("data-like", tweet.uuid);
                            //console.log(likesIcon.dataset.like);
                            
                            const likesCount = document.createElement("div");
                            likesCount.textContent = tweet.likes;
        
                        likesContainer.append(likesIcon, likesCount);
        
                        const shareContainer = document.createElement("span");
                        shareContainer.className = "tweet-detail";
        
                            const shareIcon = document.createElement("i");
                            shareIcon.className = "fa-solid fa-retweet";
        
                                if (tweet.isRetweeted) {
                                    shareIcon.className = "fa-solid fa-retweet retweeted";
                                }
        
                            shareIcon.setAttribute("data-share", tweet.uuid);
                            //console.log(shareIcon.dataset.share);
                            
                            const shareCount = document.createElement("div");
                            shareCount.textContent = tweet.retweets;
        
                        shareContainer.append(shareIcon, shareCount);
        
                    iconsDiv.append(commentsContainer, likesContainer, shareContainer);
        
                tweetContentDiv.append(tweetHandle, tweetText, iconsDiv);
        
                if(tweet.isTweeted){
                    
                    const deleteTweetBtn = document.createElement("button");
                    deleteTweetBtn.textContent = "Delete";
                    deleteTweetBtn.className = "delete-btn";
                    deleteTweetBtn.setAttribute("data-delete-tweet", tweet.uuid);
                    
                    //console.log(deleteTweetBtn.dataset.deleteTweet);
                    
                tweetContentDiv.append(deleteTweetBtn);
                    
                }
        
            tweetInner.append(profilePic, tweetContentDiv);
        
        /*Replies Container*/
        
        
        const repliesContainer = document.createElement("div");
        repliesContainer.className = "hidden";
        repliesContainer.id = "replies-" + tweet.uuid;
        //console.log(repliesContainer.id)
        
                    
                const replyInputContainer = document.createElement("div");
                replyInputContainer.className = "reply-input-area";
                    
                        const replyUserAvatar = document.createElement("img");
                        replyUserAvatar.className = "profile-pic";
                        replyUserAvatar.src = "media/scrimbalogo.png";
                                
                        const replyTextArea = document.createElement("textarea");
                        replyTextArea.placeholder = "My thoughts...";
                        replyTextArea.id = "reply-input-" + tweet.uuid;
                        //console.log(replyTextArea.id);
        
                replyInputContainer.append(replyUserAvatar, replyTextArea);
        
                const replyBtnContainer = document.createElement("div");
                replyBtnContainer.className = "reply-btn-container";
            
                    const replyBtn = document.createElement("button");
                    replyBtn.textContent = "Reply";
                    replyBtn.className = "reply-btn";
                    replyBtn.setAttribute("data-reply-btn", tweet.uuid);
                    //console.log(replyBtn.dataset.replyBtn);    
        
                replyBtnContainer.append(replyBtn);
        
        repliesContainer.append(replyInputContainer, replyBtnContainer);
        
        
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
