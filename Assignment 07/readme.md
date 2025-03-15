# Assignment 07: EcoShop Website

## Project Overview
This project implements a responsive two-page e-commerce website for a sustainable product store called "EcoShop". The website features a modern design with a focus on eco-friendly products, utilizing CSS Grid, Flexbox, and advanced SASS/SCSS features.

## Pages Included
1. **Home Page (index.html)**
   - Hero section with call-to-action
   - Features section highlighting eco-friendly benefits
   - Trending products showcase
   - Shop by category section
   - Customer testimonials
   - Newsletter signup
   - Footer with multiple information sections

2. **Products Page (products.html)**
   - Product filtering sidebar
   - Product grid with cards
   - Sorting and view controls
   - Pagination system
   - Consistent header and footer with home page

## CSS Layout Implementation

### CSS Grid Layouts

1. **Features Grid**
   - Used in the features section on the home page
   - Responsive layout that changes from 1 column on mobile to 4 columns on desktop
   - Implementation in _layouts.scss using the custom grid mixin

2. **Categories Grid**
   - Displays different product categories (Kitchen, Bathroom, Fashion, Home)
   - Responsive grid that adapts to different screen sizes
   - Uses CSS Grid with custom spacing and responsive adjustments

3. **Products Layout Grid**
   - Two-column grid on the products page
   - Left column for filters, right column for products
   - Stacks vertically on mobile devices

4. **Products Grid**
   - Displays product cards in a responsive grid
   - Changes from 1 column on mobile to 2 columns on tablets and 3 columns on desktop

5. **Footer Grid**
   - Complex grid layout for the footer sections
   - Responsive design that changes column structure based on screen size

### Flexbox Layouts

1. **Header Navigation**
   - Flexible layout for the main navigation bar
   - Distributes logo, navigation links, and icons appropriately
   - Adapts for different screen sizes

2. **Product Flex Container**
   - Flexible container for displaying trending products on home page
   - Adjusts the number of products per row based on screen size
   - Manages spacing and alignment consistently

3. **Testimonials Flex Layout**
   - Flexible layout for customer testimonial cards
   - Centers content and adjusts from single column to multiple columns

4. **Newsletter Form**
   - Flexible form layout that arranges input and button horizontally on larger screens
   - Stacks vertically on smaller screens for better usability

## SASS/SCSS Features Implemented

### Variables
- Color variables for consistent theming
- Font and typography variables
- Spacing system variables
- Border radius variables
- Transition timing variables
- All defined in _variables.scss

### Custom Properties (CSS Variables)
- Integrated with SASS variables in the :root element
- Enables runtime modifications if needed
- Includes color schemes, spacing units, and common UI properties

### Nesting
- Extensive use of nesting throughout the SCSS files
- Creates logical style hierarchies and improves code organization
- Used for component structures like cards, forms, and navigation

### Interpolation
- Dynamic class generation for category cards using @each loop
- String interpolation for background image paths
- Dynamic generation of responsive rules
- Example: Category cards background images using #{$category} syntax

### Placeholder Selectors
- Created reusable style blocks with %placeholder syntax
- Used for common patterns like containers, section spacing, and typography
- Examples: %container, %section-spacing, %heading-styles, %link-styles, %list-reset, %image-styles

### Mixins
- Responsive breakpoint mixin (respond-to)
- Flexbox configuration mixin (flex)
- Grid layout mixin (grid)
- Typography control mixins (font-style, heading)
- Button styling mixin (button)
- Card styling mixin (card)
- Text truncation mixin (truncate)
- Several other utility mixins for common patterns

### Functions
- Z-index management function (z)
- Color manipulation utilities
- Breakpoint access function
- Custom calculation functions

### Additional SASS Features
- **Maps** for organized variable collections (breakpoints, z-indices, badge colors)
- **Control directives** (@if, @each) for conditional styling
- **Partials** for modular file organization
- **Extending** styles with @extend
- **Operators** for calculations in spacing and layouts

## File Organization

The project follows a modular SCSS architecture:

```
scss/
├── base/
│   └── _base.scss         # Base styles, resets, typography
├── components/
│   └── _components.scss   # UI components (cards, buttons, forms)
├── layout/
│   └── _layouts.scss      # Major layout sections
├── utilities/
│   ├── _mixins.scss       # Reusable mixins and functions
│   └── _variables.scss    # Variables and maps
└── main.scss              # Main file that imports all partials
```

## Responsive Design Approach
- Mobile-first design philosophy
- Five breakpoint sizes (xs, sm, md, lg, xl)
- Progressive enhancement as screen size increases
- Responsive typography and spacing
- Layout transformations at different breakpoints

## UI Features
- Consistent color scheme with primary, secondary, and accent colors
- Card-based design for products and testimonials
- Hover effects and transitions for interactive elements
- Product badges (New, Sale, Limited)
- Rating visualization with stars
- Category cards with image backgrounds and overlay text
- Price display with original and sale prices
- Pagination controls
- Filter and sorting UI components

## Browser Compatibility
- Compatible with modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers
- Uses standard CSS3 features with appropriate fallbacks

## Implementation of Assignment Requirements

### Domain Selection
- Chose e-commerce/sustainable products as the website domain
- Consistent theme across both pages with clear visual identity

### CSS Grid & Flexbox
- Implemented multiple Grid layouts as required
- Used Flexbox appropriately for various UI components
- Combined both techniques to create responsive layouts

### SASS/SCSS Features
- Used all required features (variables, custom properties, nesting, interpolation, placeholders, mixins, functions)
- Added additional features like maps, control directives, and extends
- Organized code in a modular, maintainable structure

### Rich UI Design
- Created a visually appealing interface with consistent styling
- Attention to detail in spacing, typography, and color harmony
- Interactive elements with appropriate feedback
- Responsive design that looks good on all device sizes

## Setup Instructions
1. Clone the repository
2. Ensure you have Sass installed (or use an extension in VS Code)
3. To compile SCSS to CSS:
   ```
   sass scss/main.scss css/main.css
   ```
4. Open index.html in a browser to view the site

## Technologies Used
- HTML5
- CSS3
- SASS/SCSS
- FontAwesome for icons

## Learning Outcomes
Through this project, the following skills were demonstrated:
- Advanced CSS layout techniques using Grid and Flexbox
- SASS/SCSS preprocessor usage for enhanced CSS capabilities
- Responsive web design principles and implementation
- Modular and maintainable CSS architecture
- Modern UI design patterns for e-commerce
