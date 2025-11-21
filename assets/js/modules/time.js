/* Time Widget Module */

export function initTime() {
    const timeDisplay = document.getElementById('local-time');
    const dateDisplay = document.getElementById('local-date');

    if (!timeDisplay) return;

    const updateTime = () => {
        const now = new Date();

        // Time: HH:MM:SS
        timeDisplay.textContent = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        // Date: Mon, Nov 21
        if (dateDisplay) {
            dateDisplay.textContent = now.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        }
    };

    updateTime();
    setInterval(updateTime, 1000);
}
