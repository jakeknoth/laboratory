/**
 * Format total result as currency to display to user
 */
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/**
 * Refresh Status Button
 */
const getSystemStatusClicked = async () => {
  console.log("Getting System Status");
  document.querySelector(".btn-prep").innerText = "Getting Status...";
  document.querySelector(".btn-prep").disabled = true;

  try {
    const response = await fetch(
      "http://localhost:3000/tech/stateReporting/all",
      {
        method: "GET",
      }
    );
    const data = await response.json(); // Powered by Nich! Lol thanks!

    /* Clear out old data */
    const existingServices = document.querySelectorAll(".service");
    for (const service of existingServices) {
      service.remove();
    }

    /**
     * Display Services Status
     * Looks for Group Names to display in the proper groups
     */
    // Loop through resultUnits
    for (const [service, info] of Object.entries(data)) {
      // Create Element for Service
      const serviceElement = document.createElement("div");

      // Add to DOM
      if (info.state === "unresponsive") {
        serviceElement.innerHTML = `<p class="service summary-detail ">${service} ----- (${info.responseTime} ms)</p>`;
        document
          .querySelectorAll(".services-offline")[0]
          .appendChild(serviceElement);
      } else {
        serviceElement.innerHTML = `<p class="service summary-detail">${service} -----    ${info.state} ----- (${info.responseTime} ms)</p>`;
        document
          .querySelectorAll(".services-online")[0]
          .appendChild(serviceElement);
      }
    }

    document.querySelector(".btn-prep").innerText = "Refresh System Status";
    document.querySelector(".btn-prep").disabled = false;
  } catch (error) {
    console.log(error);
    document.querySelector(".btn-prep").innerText = "Get System Status";
    document.querySelector(".btn-find").disabled = false;
  }
};

/**
 * Update Assets Operation
 */
const updateAssetsClicked = async () => {
  console.log("Updating Assets");
  // Update Button Status
  document.querySelector(".btn-find").innerText = "Updating Assets";
  document.querySelector(".btn-find").disabled = true;
  // API call to Server for finding Bid
  try {
    let response = await fetch(
      "http://localhost:3000/tech/assetDiscovery/update",
      {
        method: "GET",
      }
    );
    response = await response.json(); // Powered by Nich! Lol thanks!
    console.log("Message: ", response);

    // Update Button to reflect success
    document.querySelector(".btn-find").innerText = "Update Asset Cache";

    /* Clear out old data */
    const existingServices = document.querySelectorAll(".enabled");
    for (const service of existingServices) {
      service.remove();
    }

    /* Display Enabled Services */
    for (const [service, info] of Object.entries(response.services)) {
      // Create Element for Service
      const serviceElement = document.createElement("div");

      // Add to DOM
      if (info.enable === "Yes") {
        serviceElement.innerHTML = `<p class="enabled summary-detail ">${service}</p>`;
        document
          .querySelectorAll(".enabled-services")[0]
          .appendChild(serviceElement);
      }
    }

    /* Display Enabled Sheets */
    for (const [sheet, info] of Object.entries(response.sheets)) {
      // Create Element for Service
      const sheetElement = document.createElement("div");

      // Add to DOM
      if (info.connectViaBroker === "Yes") {
        sheetElement.innerHTML = `<p class="enabled summary-detail ">${info.friendlyName}</p>`;
        document
          .querySelectorAll(".enabled-sheets")[0]
          .appendChild(sheetElement);
      }
    }

    /* Display Enable Sheets */
  } catch (error) {
    console.log("Error Loading Bid:", error);
    document.querySelector(".btn-find").innerText = "Find Bid to Calculate";
    document.querySelector(".btn-find").disabled = false;
  }
  document.querySelector(".btn-find").innerText = "Update Asset Cache";
  document.querySelector(".btn-find").disabled = false;
};

/**
 * Refresh Broker Status Operation
 */
const brokerStateClicked = async () => {
  console.log("Getting Broker Status");
  // Update Button Status
  document.querySelector(".btn-units").innerText = "Getting Broker Status";
  document.querySelector(".btn-units").disabled = true;
  /* Clear out old data */
  const existingServices = document.querySelectorAll(".broker");
  for (const service of existingServices) {
    service.remove();
  }

  // API call to Server for finding Bid
  try {
    let response = await fetch(
      "http://localhost:3000/tech/stateReporting/smartsheet",
      {
        method: "GET",
      }
    );
    response = await response.json(); // Powered by Nich! Lol thanks!

    /* Display Enabled Services */
    for (const [service, info] of Object.entries(response)) {
      // Create Element for Service
      const serviceElement = document.createElement("div");

      // Add to DOM

      switch (info.state) {
        case "disconnected":
          serviceElement.innerHTML = `<p class="broker summary-detail ">${service}</p>`;
          document
            .querySelectorAll(".brokers-offline")[0]
            .appendChild(serviceElement);
          break;

        case "unresponsive":
          serviceElement.innerHTML = `<p class="broker summary-detail ">${service}</p>`;
          document
            .querySelectorAll(".brokers-unresponsive")[0]
            .appendChild(serviceElement);
          break;

        default:
          serviceElement.innerHTML = `<p class="broker summary-detail ">${service} ----- State: ${info.state} | Que: ${info.que} | Errors: ${info.errorCount}</p>`;
          document
            .querySelectorAll(".brokers-online")[0]
            .appendChild(serviceElement);
          break;
      }
    }

    // Update Button to reflect success
    document.querySelector(".btn-units").innerText = "Refresh Broker Status";
    document.querySelector(".btn-units").disabled = false;
  } catch (error) {
    console.log("Error Calculating Units", error);
    document.querySelector(".btn-units").innerText = "Refresh Broker Status";
    document.querySelector(".btn-units").disabled = false;
  }
};

/**
 * Update Broker Management Cache Operation
 */
const brokerManagementCacheClicked = async () => {
  console.log("Updating Broker Management Cache");
  // Update Button Status
  document.querySelector(".btn-brokerManager").innerText =
    "Updating Broker Cache";
  document.querySelector(".btn-brokerManager").disabled = true;

  // API call to Server for finding Bid
  try {
    let response = await fetch(
      "http://localhost:3000/tech/smartsheetBrokerManager/update",
      {
        method: "GET",
      }
    );
    response = await response.json(); // Powered by Nich! Lol thanks!
    console.log(response);
    // Update Button to reflect success
    document.querySelector(".btn-brokerManager").innerText =
      "Update Broker Cache";
    document.querySelector(".btn-brokerManager").disabled = false;
  } catch (error) {
    console.log("Error Calculating Units", error);
    document.querySelector(".btn-brokerManager").innerText =
      "Update Broker Cache";
    document.querySelector(".btn-brokerManager").disabled = false;
  }
};

/**
 * ---------- Main String (Runs when page is loaded) ----------
 * Adds Listeners for each button
 */
const ready = async () => {
  // Call all functions to start
  getSystemStatusClicked();
  updateAssetsClicked();
  brokerStateClicked();

  // Listen for Encironment Prep clicked and enable button
  document
    .querySelector(".btn-prep")
    .addEventListener("click", getSystemStatusClicked);
  document.querySelector(".btn-prep").disabled = false;

  // Listen for find Bid clicked
  document
    .querySelector(".btn-find")
    .addEventListener("click", updateAssetsClicked);

  // Listen for Units Calc Clicked
  document
    .querySelector(".btn-units")
    .addEventListener("click", brokerStateClicked);

  // Listen for Update Broker Management Cache Called
  document
    .querySelector(".btn-brokerManager")
    .addEventListener("click", brokerManagementCacheClicked);
};

/**
 * Async Loading Check
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
  console.log("Loading...");
} else {
  ready();
}
