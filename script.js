document.addEventListener("DOMContentLoaded", () => {
    const gateScreen = document.getElementById("gate-screen");
    const inviteScreen = document.getElementById("invite-screen");
    const nameInput = document.getElementById("guest-name-input");
    const errorMsg = document.getElementById("error-message");
    const unlockBtn = document.getElementById("unlock-btn");
    const nameOutput = document.getElementById("manifested-name");
    const dynamicStatusMessage = document.getElementById("dynamic-status-message");

    // ========================================================
    // 🌟 MASTER GUEST LIST ARRAY
    // Add your guest names inside quotes below, separated by commas.
    // Keep them all in lowercase for bulletproof verification.
    // ========================================================
    const MASTER_GUEST_LIST = [
        "precious",
        "tofunmi",
        "bolu",
        "chidi",
        "tunde"
        // Add new customer names right below this line following the same pattern
    ]; 

    // Look for existing session authentication in LocalStorage
    const savedName = localStorage.getItem("nw_invite_name");
    if (savedName && MASTER_GUEST_LIST.includes(savedName.toLowerCase().trim())) {
        renderPass(savedName);
    }

    // Trigger validation processing on mouse click
    unlockBtn.addEventListener("click", () => {
        processVerification();
    });

    // Trigger validation processing on keyboard layout 'Enter' press
    nameInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") processVerification();
    });

    function processVerification() {
        const rawEnteredName = nameInput.value.trim();
        const searchName = rawEnteredName.toLowerCase(); // Convert to lowercase to check against array

        // Reset system warnings and borders
        errorMsg.classList.add("hidden");
        errorMsg.textContent = "YOU ARE NOT ON THE LIST"; // Ensure default text is set
        nameInput.style.borderColor = "rgba(255, 46, 0, 0.4)";

        // Catch empty name submission
        if (rawEnteredName === "") {
            nameInput.style.borderColor = "#FFF";
            return;
        }

        // Check if the lowercase name exists in your array
        if (!MASTER_GUEST_LIST.includes(searchName)) {
            // Access Denied path
            nameInput.style.borderColor = "#FF2E00";
            errorMsg.classList.remove("hidden");
            nameInput.value = ""; 
            return;
        }

        // AUTH SUCCESS: Format name cleanly (e.g., "precious" -> "Precious")
        const properlyFormattedName = rawEnteredName.charAt(0).toUpperCase() + rawEnteredName.slice(1);
        
        // Save identifier string locally and drop screen gate
        localStorage.setItem("nw_invite_name", properlyFormattedName);
        
        gateScreen.classList.add("fade-out-gate");
        
        setTimeout(() => {
            gateScreen.classList.add("hidden");
            renderPass(properlyFormattedName);
        }, 500);
    }

    function renderPass(name) {
        // Set the personalized message precisely as requested
        dynamicStatusMessage.textContent = `Access Granted, you are on the list, ${name}`;
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
