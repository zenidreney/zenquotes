/*THERE ARE 2 FUNCTIONS getFeedHtml and render (at the bottom)*/

/*1) Get Feed*/

export function getFeedHtml(tweets) {
    const feedHtml = document.createElement("div");
    
    tweets.forEach(function(tweet){

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
        
            /*Tweet Delete Button*/
        
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
                    
                            /*Reply Delete Button*/
                    
                                if(reply.isReplies){
                                    
                                    const replyCloseBtnContainer = document.createElement("div");
                                    replyCloseBtnContainer.className = "reply-close-btn-container";
                    
                                        const deleteReplyBtn = document.createElement("button");
                                        deleteReplyBtn.textContent = "Delete";
                                        deleteReplyBtn.className = "delete-btn";
                                        deleteReplyBtn.setAttribute("data-delete-reply", reply.uuid);
                                        deleteReplyBtn.setAttribute("data-delete-reply-parent", tweet.uuid);
                                    
                                    replyCloseBtnContainer.append(deleteReplyBtn);

                                    //console.log(deleteReplyBtn.dataset.deleteReply, deleteReplyBtn.dataset.deleteReplyParent);

                                replyTextContainer.append(replyCloseBtnContainer);

                                }

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

/*2) Render Function*/

export function render(feedHtml) {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";
    feed.append(getFeedHtml(feedHtml));
    
    
    //document.getElementById("feed").innerHTML = getFeedHtml();
}