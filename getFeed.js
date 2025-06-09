export function getFeedHtml(quotesData) {
    const feedHtml = document.createElement("div");
    
    quotesData.forEach(function(quote){

        /*Feed Container*/
        
        const quoteDiv = document.createElement("div");
        quoteDiv.className = "quote";
            const quoteInner = document.createElement("div");
            quoteInner.className = "quote-inner";
        
                const profilePic = document.createElement("img");
                profilePic.src = quote.profilePic;
                profilePic.className = "profile-pic";
                
                const quoteContentDiv = document.createElement("div");
                
                    const quoteHandle = document.createElement("p");
                    quoteHandle.className = "handle";
                    quoteHandle.textContent = quote.handle;
        
                    const quoteText = document.createElement("p");
                    quoteText.className = "quote-text";
                    quoteText.textContent = quote.quoteText;
        
                    const iconsDiv = document.createElement("div");
                    iconsDiv.className = "quote-details";
                        const commentsContainer = document.createElement("span");
                        commentsContainer.className = "quote-detail";
        
                            const repliesIcon = document.createElement("i");
                            repliesIcon.className = "fa-regular fa-comment-dots";
                            repliesIcon.setAttribute("data-reply", quote.uuid);
                            //console.log(repliesIcon.dataset.reply);
                            
                            const repliesCount = document.createElement("div");
                            repliesCount.textContent = quote.replies.length;
        
                            commentsContainer.append(repliesIcon, repliesCount);
        
                        
                        const likesContainer = document.createElement("span");
                        likesContainer.className = "quote-detail";
        
                            const likesIcon = document.createElement("i");
                            likesIcon.className = "fa-solid fa-heart";
                            
                                if(quote.isLiked){
                                    likesIcon.className = "fa-solid fa-heart liked";
                                }
        
                            likesIcon.setAttribute("data-like", quote.uuid);
                            //console.log(likesIcon.dataset.like);
                            
                            const likesCount = document.createElement("div");
                            likesCount.textContent = quote.likes;
        
                        likesContainer.append(likesIcon, likesCount);
        
                        const shareContainer = document.createElement("span");
                        shareContainer.className = "quote-detail";
        
                            const shareIcon = document.createElement("i");
                            shareIcon.className = "fa-solid fa-retweet";
        
                                if (quote.isRequoted) {
                                    shareIcon.className = "fa-solid fa-retweet requoted";
                                }
        
                            shareIcon.setAttribute("data-share", quote.uuid);
                            //console.log(shareIcon.dataset.share);
                            
                            const shareCount = document.createElement("div");
                            shareCount.textContent = quote.reQuotes;
        
                        shareContainer.append(shareIcon, shareCount);
        
                    iconsDiv.append(commentsContainer, likesContainer, shareContainer);
        
                quoteContentDiv.append(quoteHandle, quoteText, iconsDiv);
        
            /*quote Delete Button*/
        
                if(quote.isQuoted){
                    
                    const deleteQuoteBtn = document.createElement("button");
                    deleteQuoteBtn.textContent = "Delete";
                    deleteQuoteBtn.className = "delete-btn";
                    deleteQuoteBtn.setAttribute("data-delete-quote", quote.uuid);
                    
                quoteContentDiv.append(deleteQuoteBtn);
                    
                }
        
            quoteInner.append(profilePic, quoteContentDiv);
        
        /*Replies Container*/
        
        
        const repliesContainer = document.createElement("div");
        repliesContainer.className = "hidden";
        repliesContainer.id = "replies-" + quote.uuid;
        //console.log(repliesContainer.id)
        
                    
                const replyInputContainer = document.createElement("div");
                replyInputContainer.className = "reply-input-area";
                    
                        const replyUserAvatar = document.createElement("img");
                        replyUserAvatar.className = "profile-pic";
                        replyUserAvatar.src = "media/user-avatar.jpg";
                                
                        const replyTextArea = document.createElement("textarea");
                        replyTextArea.placeholder = "My thoughts...";
                        replyTextArea.id = "reply-input-" + quote.uuid;
                        //console.log(replyTextArea.id);
        
                replyInputContainer.append(replyUserAvatar, replyTextArea);
        
                const replyBtnContainer = document.createElement("div");
                replyBtnContainer.className = "reply-btn-container";
            
                    const replyBtn = document.createElement("button");
                    replyBtn.textContent = "Reply";
                    replyBtn.className = "reply-btn";
                    replyBtn.setAttribute("data-reply-btn", quote.uuid);
                    //console.log(replyBtn.dataset.replyBtn);    
        
                replyBtnContainer.append(replyBtn);
        
        repliesContainer.append(replyInputContainer, replyBtnContainer);
        
        
            if(quote.replies.length > 0){

                quote.replies.forEach(function(reply){
                    
                    const repliesDiv = document.createElement("div");
                    repliesDiv.className = "quote-reply";
                    
                        
                    
                            const quoteReplyInner = document.createElement("div");
                            quoteReplyInner.className = "quote-inner";           
                    
                                const replyAvatar = document.createElement("img");
                                replyAvatar.src = reply.profilePic;
                                replyAvatar.className = "profile-pic";

                                const replyTextContainer = document.createElement("div");

                                    const replyHandle = document.createElement("p");
                                    replyHandle.className = "handle";
                                    replyHandle.textContent = reply.handle;

                                    const replyText = document.createElement("p");
                                    replyText.className = "quote-text";
                                    replyText.textContent = reply.quoteText;

                                replyTextContainer.append(replyHandle, replyText);
                    
                            /*Reply Delete Button*/
                    
                                if(reply.isReplies){
                                    
                                    const replyCloseBtnContainer = document.createElement("div");
                                    replyCloseBtnContainer.className = "reply-close-btn-container";
                    
                                        const deleteReplyBtn = document.createElement("button");
                                        deleteReplyBtn.textContent = "Delete";
                                        deleteReplyBtn.className = "delete-btn";
                                        deleteReplyBtn.setAttribute("data-delete-reply", reply.uuid);
                                        deleteReplyBtn.setAttribute("data-delete-reply-parent", quote.uuid);
                                    
                                    replyCloseBtnContainer.append(deleteReplyBtn);

                                    //console.log(deleteReplyBtn.dataset.deleteReply, deleteReplyBtn.dataset.deleteReplyParent);

                                replyTextContainer.append(replyCloseBtnContainer);

                                }

                            quoteReplyInner.append(replyAvatar, replyTextContainer);
                
            
                    repliesDiv.append(quoteReplyInner);
                
        repliesContainer.append(repliesDiv);
            
            });       
            
        }
        
        quoteDiv.append(quoteInner, repliesContainer);
        
    feedHtml.append(quoteDiv);
        
    });
    
   
    return feedHtml;
}