function getFeedHtml() {
    const container = document.createElement('div');

    tweetsData.forEach(function (tweet) {
        const tweetDiv = document.createElement('div');
        tweetDiv.className = 'tweet';

        const tweetInner = document.createElement('div');
        tweetInner.className = 'tweet-inner';

        const profilePic = document.createElement('img');
        profilePic.className = 'profile-pic';
        profilePic.src = tweet.profilePic;

        const tweetContent = document.createElement('div');

        const handleP = document.createElement('p');
        handleP.className = 'handle';
        handleP.textContent = tweet.handle;

        const tweetTextP = document.createElement('p');
        tweetTextP.className = 'tweet-text';
        tweetTextP.textContent = tweet.tweetText;

        const tweetDetails = document.createElement('div');
        tweetDetails.className = 'tweet-details';

        const commentSpan = document.createElement('span');
        commentSpan.className = 'tweet-detail';
        const commentIcon = document.createElement('i');
        commentIcon.className = 'fa-regular fa-comment-dots';
        commentIcon.setAttribute('data-reply', tweet.uuid);
        commentSpan.appendChild(commentIcon);
        commentSpan.appendChild(document.createTextNode(' ' + tweet.replies.length));

        const likeSpan = document.createElement('span');
        likeSpan.className = 'tweet-detail';
        const likeIcon = document.createElement('i');
        likeIcon.className = 'fa-solid fa-heart' + (tweet.isLiked ? ' liked' : '');
        likeIcon.setAttribute('data-like', tweet.uuid);
        likeSpan.appendChild(likeIcon);
        likeSpan.appendChild(document.createTextNode(' ' + tweet.likes));

        const retweetSpan = document.createElement('span');
        retweetSpan.className = 'tweet-detail';
        const retweetIcon = document.createElement('i');
        retweetIcon.className = 'fa-solid fa-retweet' + (tweet.isRetweeted ? ' retweeted' : '');
        retweetIcon.setAttribute('data-retweet', tweet.uuid);
        retweetSpan.appendChild(retweetIcon);
        retweetSpan.appendChild(document.createTextNode(' ' + tweet.retweets));

        tweetDetails.appendChild(commentSpan);
        tweetDetails.appendChild(likeSpan);
        tweetDetails.appendChild(retweetSpan);

        tweetContent.appendChild(handleP);
        tweetContent.appendChild(tweetTextP);
        tweetContent.appendChild(tweetDetails);

        tweetInner.appendChild(profilePic);
        tweetInner.appendChild(tweetContent);

        tweetDiv.appendChild(tweetInner);

        const repliesContainer = document.createElement('div');
        repliesContainer.className = 'hidden';
        repliesContainer.id = 'replies-' + tweet.uuid;

        if (tweet.replies.length > 0) {
            tweet.replies.forEach(function (reply) {
                const replyDiv = document.createElement('div');
                replyDiv.className = 'tweet-reply';

                const inputArea = document.createElement('div');
                inputArea.className = 'tweet-input-area';

                const replyImg = document.createElement('img');
                replyImg.className = 'profile-pic';
                replyImg.src = 'media/scrimbalogo.png';

                const textarea = document.createElement('textarea');
                textarea.placeholder = 'Here is what I think...';
                textarea.id = 'tweet-input';

                inputArea.appendChild(replyImg);
                inputArea.appendChild(textarea);

                const replyBtn = document.createElement('button');
                replyBtn.className = 'reply-btn';
                replyBtn.textContent = 'Reply';

                const replyInner = document.createElement('div');
                replyInner.className = 'tweet-inner';

                const replyUserImg = document.createElement('img');
                replyUserImg.className = 'profile-pic';
                replyUserImg.src = reply.profilePic;

                const replyTextWrapper = document.createElement('div');
                const replyHandle = document.createElement('p');
                replyHandle.className = 'handle';
                replyHandle.textContent = reply.handle;

                const replyText = document.createElement('p');
                replyText.className = 'tweet-text';
                replyText.textContent = reply.tweetText;

                replyTextWrapper.appendChild(replyHandle);
                replyTextWrapper.appendChild(replyText);

                replyInner.appendChild(replyUserImg);
                replyInner.appendChild(replyTextWrapper);

                replyDiv.appendChild(inputArea);
                replyDiv.appendChild(replyBtn);
                replyDiv.appendChild(replyInner);

                repliesContainer.appendChild(replyDiv);
            });
        }

        tweetDiv.appendChild(repliesContainer);
        container.appendChild(tweetDiv);
    });

    return container;
}

function render() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    feed.appendChild(getFeedHtml());
}
