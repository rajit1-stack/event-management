document.addEventListener("DOMContentLoaded", function () {
  // Handle Menu Toggle
  const menu = document.querySelector("#menu-bars");
  const navbar = document.querySelector(".navbar");

  menu.addEventListener("click", () => {
      menu.classList.toggle("fa-times");
      navbar.classList.toggle("active");
  });

  // Handle Theme Toggler
  const themeToggler = document.querySelector(".theme-toggler");
  const toggleBtn = document.querySelector(".toggle-btn");

  toggleBtn.addEventListener("click", () => {
      themeToggler.classList.toggle("active");
  });

  document.querySelectorAll(".theme-toggler .theme-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
          const color = btn.style.background;
          document.querySelector(":root").style.setProperty("--theme-color", color);
      });
  });

  // Close Menu and Theme Toggler on Scroll
  window.addEventListener("scroll", () => {
      menu.classList.remove("fa-times");
      navbar.classList.remove("active");
      themeToggler.classList.remove("active");
  });

  // Initialize Swiper for Home Slider
  const homeSwiper = new Swiper(".home-slider", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
      },
      loop: true,
      autoplay: {
          delay: 3000,
          disableOnInteraction: false,
      },
  });

  // Initialize Swiper for Review Slider
  const reviewSwiper = new Swiper(".review-slider", {
      slidesPerView: 1,
      grabCursor: true,
      loop: true,
      spaceBetween: 10,
      breakpoints: {
          0: {
              slidesPerView: 1,
          },
          700: {
              slidesPerView: 2,
          },
          1050: {
              slidesPerView: 3,
          },
      },
      autoplay: {
          delay: 5000,
          disableOnInteraction: false,
      },
  });

  // Function to handle form submissions
  const handleFormSubmit = (event) => {
      event.preventDefault();
      alert("Form submitted!");
  };

  // Function to handle button clicks
  const handleButtonClick = (event) => {
      event.preventDefault();
      alert("Button clicked!");
  };

  // Add event listeners for various forms and buttons
  const ticketingForm = document.getElementById("ticketingForm");
  if (ticketingForm) {
      ticketingForm.addEventListener("submit", handleFormSubmit);
  }

  const createEventForm = document.getElementById("createEventForm");
  if (createEventForm) {
      createEventForm.addEventListener("submit", handleFormSubmit);
  }

  const communicationForm = document.getElementById("communicationForm");
  if (communicationForm) {
      communicationForm.addEventListener("submit", handleFormSubmit);
  }

  const postButton = document.getElementById("postButton");
  if (postButton) {
      postButton.addEventListener("click", handleButtonClick);
  }

  const askButton = document.getElementById("askButton");
  if (askButton) {
      askButton.addEventListener("click", handleButtonClick);
  }

  const searchInput = document.getElementById("search");
  if (searchInput) {
      searchInput.addEventListener("input", () => {
          console.log("Search query:", searchInput.value);
      });
  }

  const pollForm = document.getElementById("pollForm");
  const submitPoll = document.getElementById("submitPoll");
  if (pollForm && submitPoll) {
      submitPoll.addEventListener("click", (event) => {
          event.preventDefault();
          const selectedOption = document.querySelector('input[name="poll"]:checked');
          if (selectedOption) {
              alert(`Poll submitted: ${selectedOption.value}`);
          } else {
              alert("Please select an option before submitting.");
          }
      });
  }

  // Event Management Functions
  const eventsList = document.getElementById("eventsList");
  const filterDate = document.getElementById("filterDate");
  const filterLocation = document.getElementById("filterLocation");
  const filterCategory = document.getElementById("filterCategory");
  const sortOptions = document.getElementById("sortOptions");

  const events = [
      { name: "Event Name 1", date: "2024-08-01", location: "New York", category: "Music" },
      { name: "Event Name 2", date: "2024-09-15", location: "Los Angeles", category: "Art" },
      { name: "Event Name 3", date: "2024-07-20", location: "Chicago", category: "Technology" }
  ];

  const displayEvents = (filteredEvents) => {
      eventsList.innerHTML = "";
      filteredEvents.forEach(event => {
          const eventItem = document.createElement("div");
          eventItem.className = "event-item";
          eventItem.innerHTML = `
              <h3>${event.name}</h3>
              <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
              <p>Location: ${event.location}</p>
              <p>Category: ${event.category}</p>
          `;
          eventsList.appendChild(eventItem);
      });
  };

  const filterAndSortEvents = () => {
      const searchTerm = searchInput.value.toLowerCase();
      const dateFilter = filterDate.value;
      const locationFilter = filterLocation.value;
      const categoryFilter = filterCategory.value;

      let filteredEvents = events.filter(event => {
          return (
              (searchTerm === "" || event.name.toLowerCase().includes(searchTerm)) &&
              (dateFilter === "" || event.date === dateFilter) &&
              (locationFilter === "" || event.location === locationFilter) &&
              (categoryFilter === "" || event.category === categoryFilter)
          );
      });

      switch (sortOptions.value) {
          case "dateAsc":
              filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
              break;
          case "dateDesc":
              filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
              break;
          case "nameAsc":
              filteredEvents.sort((a, b) => a.name.localeCompare(b.name));
              break;
          case "nameDesc":
              filteredEvents.sort((a, b) => b.name.localeCompare(a.name));
              break;
      }

      displayEvents(filteredEvents);
  };

  searchInput.addEventListener("input", filterAndSortEvents);
  filterDate.addEventListener("change", filterAndSortEvents);
  filterLocation.addEventListener("change", filterAndSortEvents);
  filterCategory.addEventListener("change", filterAndSortEvents);
  sortOptions.addEventListener("change", filterAndSortEvents);

  // Initial display of events
  displayEvents(events);

  // Event Management Dashboard Functions
  const attendeeList = document.getElementById("attendeeList");
  const ticketSales = document.getElementById("ticketSales");
  const updateEventForm = document.getElementById("updateEventForm");

  const displayAttendees = () => {
      attendeeList.innerHTML = "";
      events.forEach(event => {
          event.attendees.forEach(attendee => {
              const attendeeItem = document.createElement("div");
              attendeeItem.className = "attendee-item";
              attendeeItem.innerHTML = `
                  <h3>${attendee.name}</h3>
                  <p>Email: ${attendee.email}</p>
              `;
              attendeeList.appendChild(attendeeItem);
          });
      });
  };

  const displayTicketSales = () => {
      ticketSales.innerHTML = "";
      events.forEach(event => {
          const ticketItem = document.createElement("div");
          ticketItem.className = "ticket-item";
          ticketItem.innerHTML = `
              <h3>${event.name}</h3>
              <p>Tickets Sold: ${event.ticketsSold}</p>
          `;
          ticketSales.appendChild(ticketItem);
      });
  };

  const handleUpdateEvent = (event) => {
      event.preventDefault();
      const eventDetails = document.getElementById("eventDetails").value;
      console.log("Updating event details:", eventDetails);
      // Implement event update logic here
  };

  const handleSendMessage = (event) => {
      event.preventDefault();
      const message = document.getElementById("message").value;
      console.log("Sending message:", message);
      // Implement message sending logic here
  };

  if (updateEventForm) {
      updateEventForm.addEventListener("submit", handleUpdateEvent);
  }

  if (communicationForm) {
      communicationForm.addEventListener("submit", handleSendMessage);
  }

  // Initial display of attendees and ticket sales
  displayAttendees();
  displayTicketSales();
});
