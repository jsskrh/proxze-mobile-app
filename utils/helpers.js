export const convertDate = (zuluDate) => {
  var date = new Date(zuluDate);
  var gbDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const convertTime = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours <= 12 ? "AM" : "PM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var minCont = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minCont + " " + ampm;
    return strTime;
  };
  return gbDate + " at " + convertTime(date);
};

export const convertDateWithoutTime = (zuluDate) => {
  var date = new Date(zuluDate);
  var gbDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return gbDate;
};

export const timeAgo = (date) => {
  const currentTime = new Date();
  const zuluDate = new Date(date);
  const timeDiff = currentTime - zuluDate;
  const seconds = timeDiff / 1000;

  if (seconds < 60) {
    return `${Math.floor(seconds)}s ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h ago`;
  } else if (seconds < 604800) {
    const days = Math.floor(seconds / 86400);
    return `${days}d ago`;
  } else if (seconds < 31536000) {
    const weeks = Math.floor(seconds / 604800);
    return `${weeks}w ago`;
  } else {
    const years = Math.floor(seconds / 31536000);
    return `${years}y ago`;
  }
};

export const mailDate = (zuluDate) => {
  const date = new Date(zuluDate);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    // if today, return time in HH:MM format
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (date.toDateString() === yesterday.toDateString()) {
    // if yesterday, return 'Yesterday'
    return "Yesterday";
  } else if (
    date > new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
  ) {
    // if within the past week, return the name of the day of the week
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdays[date.getDay()];
  } else {
    // otherwise, return the date in DD/MM/YYYY format
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
};

export const chatDate = (zuluDate) => {
  const date = new Date(zuluDate);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    // if today, return 'Today'
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    // if yesterday, return 'Yesterday'
    return "Yesterday";
  } else if (
    date > new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
  ) {
    // if within the past week, return the name of the day of the week
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdays[date.getDay()];
  } else {
    // otherwise, return the date in DD/MM/YYYY format
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
};

export const convertTo24HourFormat = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const hideEmail = (email) => {
  // Split the email into two parts at the @ symbol
  var parts = email.split("@");
  var username = parts[0];
  var domain = parts[1];

  // Replace all but the first and last characters of the username with *
  var hiddenUsername =
    username.charAt(0) +
    username.slice(1, -2).replace(/./g, "*") +
    username.charAt(username.length - 2) +
    username.charAt(username.length - 1);

  // Return the hidden email
  return hiddenUsername + "@" + domain;
};

export const hideChars = (string) => {
  // Replace all but the first and last characters of the string with *
  var hiddenString =
    string.charAt(0) +
    string.slice(1, -2).replace(/./g, "*") +
    string.charAt(string.length - 2) +
    string.charAt(string.length - 1);

  // Return the string
  return hiddenString;
};

export const sanitizeInput = (input) => {
  // Add your sanitation logic here. For example:
  return input.trim();
};

export const validateInput = (input) => {
  // Add your validation logic here. For example:
  const regex = /^[a-zA-Z0-9,.!? ]*$/;
  return regex.test(input) || "Please enter valid text.";
};

export const shortenId = (id) => {
  return id.toString().slice(19, 24);
};

export const formatStringCamelCase = (str) => {
  const regex = /[-/\\^$*+?.()|[\]{}]/g; // special characters to remove
  const formatted = str.replace(regex, " ").toLowerCase(); // remove special characters
  const words = formatted.split(" ");
  if (words.length > 1) {
    words[1] = words[1].charAt(0).toUpperCase() + words[1].slice(1);
  }
  return words.join("");
};

export const formatBytes = (bytes) => {
  if (bytes < 1024) {
    return bytes + " B";
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  }
};

export const updateColor = (startTime, endTime) => {
  const currentTime = new Date().getTime();
  const startDate = new Date(startTime).getTime();
  const endDate = new Date(endTime).getTime();

  if (currentTime > endDate) {
    return "rgb(220, 38, 38)";
  }

  const timeDiff = endDate - startDate;
  const timeRemaining = Math.max(endDate - currentTime, 0);
  const percentage = timeRemaining / timeDiff;
  const red = Math.floor(255 + (220 - 255) * percentage);
  const green = Math.floor(255 + (38 - 255) * percentage);
  const blue = Math.floor(255 + (38 - 255) * percentage);
  return `rgb(${red}, ${green}, ${blue})`;
};

export const timeDue = (endDate) => {
  const currentTime = new Date().getTime();
  const endDateTime = new Date(endDate).getTime();
  const timeRemaining = endDateTime - currentTime;

  if (timeRemaining <= 0) {
    // Time has passed
    const timeDiff = Math.abs(timeRemaining);
    const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
    if (hoursAgo >= 24) {
      const daysAgo = Math.floor(hoursAgo / 24);
      return `Due ${daysAgo}d ago`;
    } else {
      return `Due ${hoursAgo}h ago`;
    }
  } else {
    // Time is in the future
    if (timeRemaining < 1000) {
      return `Due in less than a second`;
    } else if (timeRemaining < 60 * 1000) {
      const seconds = Math.floor(timeRemaining / 1000);
      return `Due in ${seconds}s`;
    } else if (timeRemaining < 60 * 60 * 1000) {
      const minutes = Math.floor(timeRemaining / (60 * 1000));
      return `Due in ${minutes}m`;
    } else if (timeRemaining < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
      return `Due in ${hours}h`;
    } else {
      const days = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
      return `Due in ${days}d`;
    }
  }
};
