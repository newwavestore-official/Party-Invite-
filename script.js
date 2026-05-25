document.addEventListener("DOMContentLoaded", () => {
    const gateScreen = document.getElementById("gate-screen");
    const inviteScreen = document.getElementById("invite-screen");
    const nameInput = document.getElementById("guest-name-input");
    const passwordInput = document.getElementById("gate-password-input");
    const errorMsg = document.getElementById("error-message");
    const unlockBtn = document.getElementById("unlock-btn");
    const nameOutput = document.getElementById("manifested-name");

    // ========================================================
    // CONFIGURATION: Set your system password key down here
    // ========================================================
    const SECRET_PASSWORD = "WAVE26"; 

    // Look for existing session authentication in LocalStorage
    const savedName = localStorage.getItem("nw_invite_name");
    if (savedName) {
        renderPass(savedName);
    }

    // Trigger validation processing on mouse click
    unlockBtn.addEventListener("click", () => {
        processVerification();
    });

    // Trigger validation processing on keyboard layout 'Enter' press
    passwordInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") processVerification();
    });
    nameInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") processVerification();
    });

    function processVerification() {
        const enteredName = nameInput.value.trim();
        const enteredPassword = passwordInput.value.trim().toUpperCase(); 

        // Reset system warnings and borders
        errorMsg.classList.add("hidden");
        passwordInput.style.borderColor = "rgba(255, 46, 0, 0.4)";
        nameInput.style.borderColor = "rgba(255, 46, 0, 0.4)";

        // Catch empty name submission
        if (enteredName === "") {
            nameInput.style.borderColor = "#FFF";
            return;
        }

        // Catch incorrect password key entry
        if (enteredPassword !== SECRET_PASSWORD) {
            passwordInput.style.borderColor = "#FF2E00";
            errorMsg.classList.remove("hidden");
            passwordInput.value = ""; 
            return;
        }

        // AUTH SUCCESS: Save identifier string locally and drop screen gate
        localStorage.setItem("nw_invite_name", enteredName);
        
        gateScreen.classList.add("fade-out-gate");
        
        setTimeout(() => {
            gateScreen.classList.add("hidden");
            renderPass(enteredName);
        }, 500);
    }

    function renderPass(name) {
        nameOutput.textContent = name;
        inviteScreen.classList.remove("hidden");
    }

    // Interactive subtle desktop 3D tilting parallax handling
    const container = document.querySelector('.invite-container');
    const logo = document.querySelector('.brand-logo');

    if (container && logo) {
        container.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
            logo.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        container.addEventListener('mouseleave', () => {
            logo.style.transform = `rotateY(0deg) rotateX(0deg)`;
            logo.style.transition = 'all 0.5s ease';
        });
    }
});
