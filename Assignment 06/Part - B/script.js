document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.getElementById('time');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const datePicker = document.getElementById('datePicker');

    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;

    // Disable manual typing in date picker
    datePicker.addEventListener('keydown', (e) => {
        e.preventDefault();
    });

    // Prevent paste in date picker
    datePicker.addEventListener('paste', (e) => {
        e.preventDefault();
    });

    const formatTime = (time) => {
        const pad = (n) => n.toString().padStart(2, '0');
        const hours = pad(Math.floor(time / 3600));
        const minutes = pad(Math.floor((time % 3600) / 60));
        const seconds = pad(Math.floor(time % 60));
        return `${hours}:${minutes}:${seconds}`;
    };

    const updateTime = () => {
        const currentTime = Date.now();
        elapsedTime = Math.floor((currentTime - startTime) / 1000);
        timeDisplay.textContent = formatTime(elapsedTime);
    };

    const startTimer = async () => {
        if (!isRunning) {
            return new Promise((resolve) => {
                startTime = Date.now() - elapsedTime * 1000;
                timerInterval = setInterval(updateTime, 1000);
                isRunning = true;
                resolve();
            });
        }
    };

    const stopTimer = async () => {
        if (isRunning) {
            return new Promise((resolve) => {
                clearInterval(timerInterval);
                isRunning = false;
                resolve();
            });
        }
    };

    const resetTimer = async () => {
        return new Promise((resolve) => {
            clearInterval(timerInterval);
            elapsedTime = 0;
            timeDisplay.textContent = formatTime(elapsedTime);
            isRunning = false;
            resolve();
        });
    };

    startBtn.addEventListener('click', async () => {
        await startTimer();
    });

    stopBtn.addEventListener('click', async () => {
        await stopTimer();
    });

    resetBtn.addEventListener('click', async () => {
        await resetTimer();
    });

    // Set today's date as default
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    datePicker.value = formattedDate;
});