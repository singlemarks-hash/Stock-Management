# Design Guidelines: Kitchen Inventory Management System

## Design Approach
**Selected Approach:** Design System + Productivity Reference Hybrid
- **Primary System:** Material Design principles for data density and forms
- **Reference Inspiration:** Linear (clean data tables), Notion (tag system), Airtable (spreadsheet-like editing)
- **Rationale:** This is a utility-focused, information-dense application requiring efficient data entry and clear status visibility

## Core Design Elements

### Typography
- **Primary Font:** Inter (via Google Fonts CDN) - excellent readability for data-heavy interfaces
- **Headings:** 
  - H1: text-2xl font-semibold (page titles)
  - H2: text-lg font-semibold (section headers, alert summaries)
  - H3: text-base font-medium (category labels, tab headers)
- **Body Text:** text-sm font-normal (table content, form labels)
- **Data/Numbers:** text-sm font-medium tabular-nums (inventory quantities, ensuring number alignment)
- **Small Text:** text-xs (timestamps, helper text)

### Layout System
**Spacing Units:** Use Tailwind units of 2, 3, 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: p-4, p-6
- Section spacing: space-y-6, space-y-8
- Table cell padding: px-4 py-3
- Card spacing: p-6
- Button spacing: px-4 py-2

**Structure:**
- Left sidebar: w-64 (team/season selection, navigation)
- Main content area: flex-1 with max-w-7xl container
- Alert banner: Full-width sticky at top, h-auto with py-4
- Table container: w-full with horizontal scroll on overflow

### Component Library

#### Navigation & Layout
**Left Sidebar:**
- Fixed position with clean vertical navigation
- Team selector at top (radio button group)
- Season selector below (4 large clickable season cards with emoji icons)
- Last selected season highlighted with distinct visual treatment
- Spacing: py-6 px-4

**Alert Banner (Top):**
- Sticky position at top of main content
- Summary cards in horizontal grid (grid-cols-3 gap-4)
- Each card shows: count badge, category label, and "View Items" link
- Alert badges use distinct visual treatment (not relying on color alone)
- Dismissible per-category alerts

#### Data Display
**Main Table:**
- Spreadsheet-like design with clear grid lines
- Sticky header row
- Alternating row treatment for scanability
- Column widths: 
  - Checkbox: w-12
  - Item name: flex-1 min-w-48
  - Numbers (stock, required, order qty): w-24
  - Dates: w-32
  - Status/Tags: flex-1 min-w-40
- Editable cells have subtle hover state in edit mode
- Non-editable cells have distinct visual treatment

**Status Indicators:**
- Order Required: Badge with icon (alert triangle)
- Order Placed: Badge with icon (clock) + timestamp
- Sufficient Stock: Minimal visual (checkmark icon only)
- Use icons from Heroicons (via CDN)

#### Interactive Components
**Edit Mode Toggle:**
- Prominent toggle button in header (text-base font-medium)
- When active: "Save Changes" and "Cancel" buttons appear
- Table cells become editable with input field styling
- Clear visual distinction between view and edit modes

**Tag System (Menu Usage):**
- Multi-select dropdown similar to Notion
- Pill-style tags with × remove button
- Dropdown shows existing tags + "Create new tag" option
- Tags wrap within cell, max-height with scroll if needed
- Input field for new tag creation inline

**Date Picker:**
- Calendar dropdown for individual items
- "Select All" checkbox at table header
- Selected dates shown as formatted text (YYYY-MM-DD)
- Bulk date selection modal for multiple items

**Category Tabs:**
- Horizontal tab bar below alert banner
- Two main tabs: "식자재" and "비식품"
- Sub-tabs for food category: "냉장", "냉동", "상온"
- Active tab with underline indicator

#### Forms & Inputs
- Standard input fields: border with rounded corners, px-3 py-2
- Number inputs: Right-aligned text, spinner controls visible
- Checkboxes: Large touch target (min-w-5 min-h-5)
- Select dropdowns: Consistent with input styling
- All form elements have clear focus states

### Interaction Patterns
- **Bulk Selection:** Checkbox column for multi-select operations
- **Inline Editing:** Click to edit in edit mode, tab to navigate between cells
- **Smart Alerts:** Auto-update when quantities change, persist until acknowledged or order received
- **Order Tracking:** Timestamp appears automatically when order checkbox is checked, with user name if available

### Data Organization
**Hierarchy Display:**
- Group rows by major category (식자재 / 비식품)
- Sub-group headers for classifications (냉장/냉동/상온)
- Collapsible groups with expand/collapse icons
- Further sub-classification rows (유제품·치즈, 잎채소&허브류) shown as lightweight row separators

### Visual Hierarchy
- Alert urgency shown through badge styling and position (top of page)
- Orders needed highlighted distinctly from normal stock items
- Recent updates/changes have subtle highlight treatment
- Seasonal settings accessible but not prominent in daily workflow

### Responsive Behavior
- Desktop-first design (primary use case)
- Horizontal scroll for table on smaller screens
- Sidebar collapses to hamburger menu on tablet/mobile
- Alert cards stack vertically on mobile

### Images
**No hero image needed** - This is a data-focused utility application. Visual elements limited to:
- Icons throughout (Heroicons set for consistency)
- Empty state illustrations when no items in category
- Seasonal selector emoji icons (❄️ ☘️ ☀️ 🍂)