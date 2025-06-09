import { quotesData } from "./data.js";
import { render } from "./renderFeed.js";
// Alternative path is in the script tag of the html.
//import { v4 as uuidv4 } from "https://jspm.dev/uuid"; 
//console.log(uuidv4());


const savedQuoteData = localStorage.getItem("quotesData");

/*Load from Local Storage*/

if(savedQuoteData) {
    const parsedQuotes = JSON.parse(savedQuoteData);
    quotesData.length = 0;
    
    parsedQuotes.forEach(function(quote){
        quotesData.push(quote);
        
    });
}

/*Save to Local Storage*/

function saveToLocalStorage() {
    
    localStorage.setItem("quotesData", JSON.stringify(quotesData));
    
}

/*Event Listeners*/

document.addEventListener("click", function (e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like);
    } else if (e.target.dataset.share) {
        handleRequoteClick(e.target.dataset.share);
    } else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply);
    } else if (e.target.id === "quote-btn") {
        handleQuoteBtnClick();
    } else if (e.target.dataset.replyBtn) {
        handleReplyBtnClick(e.target.dataset.replyBtn);
    } else if (e.target.dataset.deleteQuote) {
        handleDeleteQuote(e.target.dataset.deleteQuote);
    } else if (e.target.dataset.deleteReply) {
        handleDeleteReply(e.target.dataset.deleteReplyParent, e.target.dataset.deleteReply);
    }
});

/*Event Handlers*/

function handleQuoteBtnClick() {
    const quoteInput = document.getElementById("quote-input");

    if (quoteInput.value) {
        quotesData.unshift({
            handle: `@Zenid`,
            profilePic: `media/user-avatar.jpg`,
            likes: 0,
            reQuotes: 0,
            quoteText: quoteInput.value,
            replies: [],
            isLiked: false,
            isRequoted: false,
            isQuoted: true,
            uuid: uuidv4()
        });
        
        saveToLocalStorage();
        render(quotesData);
        quoteInput.value = "";
    }
}

function handleDeleteQuote(quoteId) {
    const targetQuoteIndex = quotesData.findIndex(function(quote){
        
        return quote.uuid === quoteId;
        
    });
    
    //console.log(targetQuoteIndex);
    
    if (targetQuoteIndex !== -1){
        
        quotesData.splice(targetQuoteIndex, 1);
        
        saveToLocalStorage();
        render(quotesData);  
    }
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

function handleLikeClick(quoteId) {
    const targetQuoteObj = quotesData.filter(function (quote) {
        return quote.uuid === quoteId;
    })[0];

    if (targetQuoteObj.isLiked) {
        targetQuoteObj.likes--;
    } else {
        targetQuoteObj.likes++;
    }
    targetQuoteObj.isLiked = !targetQuoteObj.isLiked;
    
    saveToLocalStorage();
    render(quotesData);

}

function handleRequoteClick(quoteId) {
    const targetQuoteObj = quotesData.filter(function (quote) {
        return quote.uuid === quoteId;
    })[0];

    if (targetQuoteObj.isRequoted) {
        targetQuoteObj.reQuotes--;
    } else {
        targetQuoteObj.reQuotes++;
    }
    targetQuoteObj.isRequoted = !targetQuoteObj.isRequoted;
    
    saveToLocalStorage();
    render(quotesData);
}

function handleReplyBtnClick(quoteId){
    
    const replyTextInput = document.getElementById(`reply-input-${quoteId}`);
    
    if(replyTextInput.value){
        const targetQuoteObj = quotesData.filter(function (quote) {
        return quote.uuid === quoteId;
    })[0];
     
        targetQuoteObj.replies.unshift({
            
            handle: `@Zenid`,
            profilePic: `media/user-avatar.jpg`,
            quoteText: replyTextInput.value,
            isReplies: true,
            uuid: uuidv4()
        });
        
        saveToLocalStorage();
        render(quotesData);
        
        //console.log(targetQuoteObj.uuid);
        
        replyTextInput.value = "";
        
        const repliesContainer = document.getElementById(`replies-${quoteId}`);
        repliesContainer.classList.remove("hidden");
    }

}

function handleDeleteReply(parentQuoteId, replyId) {
    const targetQuoteObj = quotesData.filter(function(quote){
        return quote.uuid === parentQuoteId;
        
    })[0];
    
    if(targetQuoteObj){
        const replyIndex = targetQuoteObj.replies.findIndex(function(reply){
            
           return reply.uuid === replyId; 
        });
        
        if(replyIndex !== -1) {
            
            targetQuoteObj.replies.splice(replyIndex, 1);
            
            saveToLocalStorage();
            render(quotesData);
            
            const repliesContainer = document.getElementById(`replies-${parentQuoteId}`);
            repliesContainer.classList.remove("hidden");
        }
        
    }
    
}

render(quotesData);
