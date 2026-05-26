document.addEventListener("DOMContentLoaded", () => {
    const gateScreen = document.getElementById("gate-screen");
    const inviteScreen = document.getElementById("invite-screen");
    const nameInput = document.getElementById("guest-name-input");
    const errorMsg = document.getElementById("error-message");
    const unlockBtn = document.getElementById("unlock-btn");
    const nameOutput = document.getElementById("manifested-name");
    const dynamicStatusMessage = document.getElementById("dynamic-status-message");

    // ========================================================
    // GUEST LIST ARRAY (Names must be lowercase here)
    // ========================================================
    const MASTER_GUEST_LIST = [
        "bolu",
        "precious",
        "tofunmi",
        "chidi",
        "tunde"
    ]; 

    // Auto-login if they already verified earlier
    const savedName = localStorage.getItem("nw_invite_name");
    if (savedName && MASTER_GUEST_LIST.includes(savedName.toLowerCase().trim())) {
        renderPass(savedName);
    }

    // Button Click
    unlockBtn.addEventListener("click", () => {
        processVerification();
    });

    // Enter Key Press
    nameInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") processVerification();
    });

    function processVerification() {
        const rawEnteredName = nameInput.value.trim();
        const searchName = rawEnteredName.toLowerCase();

        // Reset display states
        errorMsg.classList.add("hidden");
        errorMsg.style.display = "none";
        nameInput.style.borderColor = "rgba(255, 46, 0, 0.4)";

        if (rawEnteredName === "") {
            nameInput.style.borderColor = "#FFF";
            return;
        }

        // Check if name is on the list
        if (!MASTER_GUEST_LIST.includes(searchName)) {
            nameInput.style.borderColor = "#FF2E00";
            errorMsg.classList.remove("hidden");
            errorMsg.style.display = "block";
            nameInput.value = ""; 
            return;
        }

        // Success path
        const properlyFormattedName = rawEnteredName.charAt(0).toUpperCase() + rawEnteredName.slice(1);
        localStorage.setItem("nw_invite_name", properlyFormattedName);
        
        gateScreen.classList.add("fade-out-gate");
        
        setTimeout(() => {
            gateScreen.style.display = "none";
            renderPass(properlyFormattedName);
        }, 400);
    }

    function renderPass(name) {
        if (dynamicStatusMessage) {
            dynamicStatusMessage.textContent = `Access Granted, you are on the list, ${name}`;
        }
        nameOutput.textContent = name;
        inviteScreen.style.display = "block"; 
        inviteScreen.classList.remove("hidden");
    }

    // 3D Parallax Effect
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
