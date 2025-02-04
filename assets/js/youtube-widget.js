document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const domElements = {
        player: document.getElementById('youtube-player'),
        input: document.getElementById('youtube-id'),
        toggleInputButton: document.getElementById('toggle-input-visibility'),
        toggleVisibilityButton: document.getElementById('toggle-visibility'),
        togglePlaybackButton: document.getElementById('toggle-playback'),
        volumeSlider: document.getElementById('volume-slider'),
        loopButton: document.getElementById('toggle-loop'),
        hideIcon: document.getElementById('hide-icon'),
        showIcon: document.getElementById('show-icon'),
        hideInputIcon: document.getElementById('hide-input-icon'),
        showInputIcon: document.getElementById('show-input-icon'),
        enableLoopIcon: document.getElementById('enable-loop-icon'),
        disableLoopIcon: document.getElementById('disable-loop-icon'),
        playIcon: document.getElementById('play-icon'),
        pauseIcon: document.getElementById('pause-icon'),
    };

    // LocalStorage Keys
    const storageKeys = {
        localStorageKey: 'youtubePlayerID',
        inputHiddenKey: 'inputHiddenState',
        iframeHiddenKey: 'iframeHiddenState',
        loopStateKey: 'loopState',
        youtubeAudioTimeKey: 'youtubeAudioTime',
    };

    const defaultVideoID = '6xpBoLetha0';
    let timeUpdateInterval;
    let isPlaying = false; // 재생 상태

    // Utility: Send a message to the iframe
    const postMessageToPlayer = (command, args = []) => {
        const iframeWindow = domElements.player.contentWindow;
        if (iframeWindow) {
            iframeWindow.postMessage(
                JSON.stringify({
                    event: 'command',
                    func: command,
                    args: args,
                }),
                '*' // 명시적 origin 설정
            );
        } else {
            console.error("Iframe window not available!");
        }
    };

    // 디버깅용 로그 추가
    window.addEventListener('message', (event) => {
        console.log('Message event received:', event);
        console.log('Event origin:', event.origin);
        console.log('Event data:', event.data);
    });

    // iframe으로부터 메시지 처리
    // window.addEventListener('message', (event) => {
    //     let data;
    //     try {
    //         data = JSON.parse(event.data);
    //         console.log("Message received from YouTube:", data);
    //     } catch (err) {
    //         console.error("Error parsing message data:", event.data);
    //         return;
    //     }
    //
    //     // currentTime 업데이트
    //     if (data.event === 'infoDelivery' && data.info && typeof data.info.currentTime !== 'undefined') {
    //         const currentTime = data.info.currentTime;
    //         console.log(`Current time received: ${currentTime}`);
    //         localStorage.setItem(storageKeys.youtubeAudioTimeKey, currentTime);
    //     } else {
    //         console.warn("Message does not contain currentTime:", data);
    //     }
    // });


    // Initialize player using YouTube API
    const initializePlayer = () => {
        const savedID = localStorage.getItem(storageKeys.localStorageKey) || defaultVideoID;
        const savedTime = parseFloat(localStorage.getItem(storageKeys.youtubeAudioTimeKey)) || 0;

        // YouTube IFrame Player 초기화
        const player = new YT.Player(domElements.player.id, {
            videoId: savedID,
            playerVars: {
                autoplay: 1,
                loop: 1,
                enablejsapi: 1,
                playlist: savedID,
                start: savedTime,
            },
            events: {
                onReady: () => {
                    console.log("YouTube player is ready.");
                    // 주기적으로 현재 시간을 요청
                    timeUpdateInterval = setInterval(() => postMessageToPlayer('getCurrentTime'), 1000);
                },
            },
        });
        domElements.input.value = savedID;
    };

    // Update player source and reset playback time
    const updateVideo = (videoID) => {
        domElements.player.src = `https://www.youtube.com/embed/${videoID}?playlist=${videoID}&autoplay=1&loop=1&enablejsapi=1`;
        localStorage.setItem(storageKeys.localStorageKey, videoID);
        localStorage.setItem(storageKeys.youtubeAudioTimeKey, 0); // 재생 시간 초기화
    };

    // Initialize visibility for input and iframe
    const initializeVisibility = () => {
        const inputHidden = JSON.parse(localStorage.getItem(storageKeys.inputHiddenKey) || 'false');
        const iframeHidden = JSON.parse(localStorage.getItem(storageKeys.iframeHiddenKey) || 'false');
        domElements.input.classList.toggle('hidden', inputHidden);
        domElements.hideInputIcon.classList.toggle('hidden', inputHidden);
        domElements.showInputIcon.classList.toggle('hidden', !inputHidden);
        domElements.player.classList.toggle('hidden', iframeHidden);
        domElements.hideIcon.classList.toggle('hidden', iframeHidden);
        domElements.showIcon.classList.toggle('hidden', !iframeHidden);
    };

    // Initialize loop state
    const initializeLoopState = () => {
        const isLooping = JSON.parse(localStorage.getItem(storageKeys.loopStateKey) || 'true');
        updateLoopState(isLooping);
    };

    // Update loop state
    const updateLoopState = (isLooping) => {
        postMessageToPlayer('setLoop', [isLooping]);
        domElements.enableLoopIcon.classList.toggle('hidden', isLooping);
        domElements.disableLoopIcon.classList.toggle('hidden', !isLooping);
        localStorage.setItem(storageKeys.loopStateKey, JSON.stringify(isLooping));
    };

    // Toggle playback
    const togglePlayback = () => {
        if (isPlaying) {
            postMessageToPlayer('pauseVideo');
        } else {
            postMessageToPlayer('playVideo');
        }
        isPlaying = !isPlaying;
        domElements.playIcon.classList.toggle('hidden', isPlaying);
        domElements.pauseIcon.classList.toggle('hidden', !isPlaying);
    };

    // Event Handlers
    const handleInputKeydown = (event) => {
        if (event.key === 'Enter') {
            const videoID = domElements.input.value.trim();
            if (videoID) {
                updateVideo(videoID);
            }
        }
    };

    const toggleInputVisibility = () => {
        const isHidden = domElements.input.classList.toggle('hidden');
        localStorage.setItem(storageKeys.inputHiddenKey, JSON.stringify(isHidden));
        domElements.hideInputIcon.classList.toggle('hidden', isHidden);
        domElements.showInputIcon.classList.toggle('hidden', !isHidden);
    };

    const toggleIframeVisibility = () => {
        const isHidden = domElements.player.classList.toggle('hidden');
        localStorage.setItem(storageKeys.iframeHiddenKey, JSON.stringify(isHidden));
        domElements.hideIcon.classList.toggle('hidden', isHidden);
        domElements.showIcon.classList.toggle('hidden', !isHidden);
    };

    const toggleLoop = () => {
        const isLooping = JSON.parse(localStorage.getItem(storageKeys.loopStateKey) || 'true');
        updateLoopState(!isLooping);
    };

    const handleVolumeChange = (event) => {
        const volume = event.target.value;
        postMessageToPlayer('setVolume', [volume]);
    };

    // Register Event Listeners
    domElements.input.addEventListener('keydown', handleInputKeydown);
    domElements.toggleInputButton.addEventListener('click', toggleInputVisibility);
    domElements.toggleVisibilityButton.addEventListener('click', toggleIframeVisibility);
    domElements.togglePlaybackButton.addEventListener('click', togglePlayback);
    domElements.volumeSlider.addEventListener('input', handleVolumeChange);
    domElements.loopButton.addEventListener('click', toggleLoop);

    // Load YouTube IFrame API script
    const loadYouTubeAPI = () => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };

    loadYouTubeAPI();

    // Initialize on page load
    initializeVisibility();
    initializeLoopState();
});