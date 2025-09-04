/**
 * PORTFOLIO WEBSITE JAVASCRIPT
 * Main functionality for interactive elements
 */

// ========================================
// DRAGGABLE CLOUD ELEMENT
// ========================================

// Get the cloud element (star variable name kept for compatibility)
const star = document.getElementById("cloud");

// Drag state variables
let newX = 0, newY = 0, startX = 100, startY = 100;
let offsetX = 0, offsetY = 0;
let isDragging = false;

// Initialize drag functionality
if (star) {
  star.addEventListener('mousedown', mouseDown);
}

/**
 * Handle mouse down event - start dragging
 * @param {MouseEvent} e - Mouse event object
 */
function mouseDown(e) {
  isDragging = true;
  e.preventDefault();
  
  // Store initial mouse position
  startX = e.clientX;
  startY = e.clientY;

  // Add event listeners for drag and release
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener("mouseup", mouseUp);

  // Calculate offset from mouse to element position
  offsetX = star.getBoundingClientRect().left - startX;
  offsetY = star.getBoundingClientRect().top - startY;
}

/**
 * Handle mouse move event - update element position
 * @param {MouseEvent} e - Mouse event object
 */
function mouseMove(e) {
  // Calculate new position based on mouse movement
  newX = startX - e.clientX;
  newY = startY - e.clientY;

  const newPosX = e.clientX + offsetX;
  const newPosY = e.clientY + offsetY;

  // Update element position
  star.style.left = newPosX + "px";
  star.style.top = newPosY + "px";
}

/**
 * Handle mouse up event - stop dragging
 * @param {MouseEvent} e - Mouse event object
 */
function mouseUp(e) {
  isDragging = false;
  document.removeEventListener("mousemove", mouseMove);
}

// ========================================
// MOBILE NAVIGATION
// ========================================

/**
 * Toggle mobile navigation menu
 * @param {HTMLElement} menu - Menu element to toggle
 */
function toggleMobileMenu(menu) {
  menu.classList.toggle("open");
  document.getElementById("nav-bar").classList.toggle("expanded");
}