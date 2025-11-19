

## **Documentation Structure Plan** (Table of Contents)

```
📁 Project Name
├── 📄 Overview
├── 📄 Getting Started
├── 📄 Folder Structure
├── 📄 Routing System
├── 📄 Components
│   └── 📄 Reusable Components
├── 📄 State Management
├── 📄 API Integration
├── 📄 Code Style Guide
├── 📄 Environment Variables
└── 📄 Deployment Guide
```
# Getting Started


## 🧰 1. Installation

```bash
git clone https://github.com/ClickERPDevlopment/click-erp-frontend.git
cd click-erp-frontend
npm install
npm run dev
```

---

## ⚠️ First-Time Style Issue (Important)

> 🟡 **Known Issue**: After running `npm run dev`, sometimes TailwindCSS or other styles **don’t apply immediately** in the browser.

### ✅ Solution:

After opening `http://localhost:5173` (or your Vite dev server port):

👉 **Manually refresh the page once** using `Ctrl + R` or `Cmd + R`.

> This happens due to how Vite handles CSS modules and caching during the first dev load. After refreshing, it works normally during the full session.

---

Certainly! Here's a more polished and developer-friendly version of the **`Requirements`** section for your `click-erp-frontend` project:

---

## System Requirements

To run and develop this project smoothly, ensure the following tools are installed in your environment:

### 🧰 Prerequisites

| Tool        | Required Version  | Download Link                              |
| ----------- | ----------------- | ------------------------------------------ |
| **Node.js** | `v18.x` or higher | [https://nodejs.org/](https://nodejs.org/) |
| **npm**     | `v9.x` or higher  | Comes bundled with Node.js                 |

You can verify your versions using:

```bash
node -v
npm -v
```

---

## 2. **Folder Structure with Explanation**

```md
# Folder Structure


```markdown
src/
├── api/                # API service calls
├── app/                # Core app logic and domain modules
│   ├── idb/            # IndexedDB or local DB-related logic for modules
│   ├── middleware/     # Redux or custom middleware
│   ├── store/          # Redux store setup and slices (appSlice.ts, dropdownSlice.ts)
│   ├── constants.ts    # App-wide constants
├── assets/             # Static assets like images, fonts, icons
├── components/         # Reusable UI components (buttons, modals, inputs, tables, etc.)
├── config/             # Configuration files or constants (e.g. API config)
├── features/           # Feature-specific code (may be for domain logic)
├── hooks/              # Custom React hooks
├── layouts/            # Layout components (page wrappers, headers, footers)
├── modules/            # Domain modules (e.g., Merchadising accounts, garmentsProduction, planning)
│   ├── garmentsProduction/
│   │   ├── components/ # Components specific to garmentsProduction
│   │   ├── hooks/      # Feature-specific hooks
│   │   ├── pages/      # Page-level components (e.g., productionEntry, cutting)
│   │   ├── reduxSlices/
│   │   ├── services/
│   │   ├── types/
│   │   └── routes.ts
├── pages/              # Route-level pages (auth, dashboard, working, NotFound)
├── redux/              # Redux-related stuff (global slices or config)
├── routes/             # Route definitions (publicRoutes, privateRoutes, etc.)
├── styles/             # CSS/Tailwind config, themes, global styles
├── types/              # Global TS types/interfaces
├── utils/              # Utility functions and helpers
├── App.tsx             # App root component
├── main.tsx            # React DOM entry point
├── vite.config.ts      # Vite config file
```

---


## 📘 3. Routing Structure

The routing in this project is handled using **React Router DOM v6**. The routing logic lives in:

```
📁 src/
 └── routes/
     ├── index.tsx               # Main route configuration
     ├── privateRoutes.tsx      # Routes for authenticated users (web version)
     ├── privateRoutesForWinApp.tsx # Routes for Windows App authenticated users
     └── publicRoutes.tsx       # Routes for unauthenticated users
```

### 🔁 Routing Flow

The root router is defined in `index.tsx`. This controls all public, private, and winapp routes. Routing is wrapped inside `<Router>` and uses nested route structures with guards (`PrivateRoute`, `PublicRoute`).

---

### 🌐 Route Guards

| Guard Component         | Purpose                                                                |
| ----------------------- | ---------------------------------------------------------------------- |
| `PublicRoute`           | For **unauthenticated** pages (e.g., login)                            |
| `PrivateRoute`          | For **authenticated webapp** pages (e.g., dashboard, modules)          |
| `PrivateRouteForWinApp` | For **authenticated winapp** users (for Windows App-specific behavior) |

All these guards use `useAuth()` to check if a `user` is available.

---

### 🧠 Auth Check Logic

```tsx
<Route path="/" element={<Navigate to={user ? "/webapp/dashboard" : "/login"} />} />
```

This ensures that the root path `/` redirects based on authentication status.

---

### 📂 Main Route Groups

#### ✅ Public Routes

Accessible only when user is **not logged in**:

```tsx
<Route element={<PublicRoute />}>
  <Route path="/login" element={<Login />} />
</Route>
```

#### 🔒 Web App Private Routes

Accessible only when **logged in via web interface**:

```tsx
<Route path="/webapp" element={<PrivateRoute />}>
  <Route path="dashboard" element={<DashboardHome />} />
  <Route path="accounts/*" element={<AccountsRoutes />} />
  <Route path="gmt-production/*" element={<GarmentsProductionRoutes />} />
  <Route path="gmt-planning/*" element={<PlanningRoutes />} />
  ...
</Route>
```

#### 🪟 Windows App Private Routes

Same as above but separated for Windows-specific access control:

```tsx
<Route path="/winapp" element={<PrivateRouteForWinApp />}>
  ...
</Route>
```

---

### 📄 UI Test Routes

These are useful for development/testing of individual components:

| Path                      | Component            | Purpose                         |
| ------------------------- | -------------------- | ------------------------------- |
| `/webapp/ui/test_form`    | `TestForm`           | Demo form usage                 |
| `/webapp/ui/editor`       | `EditorComponentUse` | Rich text editor example        |
| `/webapp/ui/input_box`    | `InputBoxUse`        | Input box styling & behavior    |
| `/webapp/ui/panel`        | `PanelUse`           | Usage of custom Panel component |
| `/webapp/ui/table_basic`  | `TableUseBasic`      | Basic table example             |
| `/webapp/ui/table_google` | `TableUseGoogle`     | Table with Google-style design  |
| `/webapp/ui/table_input`  | `TableUseInput`      | Table with input interaction    |

✅ These routes are accessible in both `/webapp` and `/winapp`.

---

### 🌍 Feature Route Integration

Each module (like accounts, planning, garmentsProduction) provides its own internal `routes.ts`:

```tsx
<Route path="accounts/*" element={<AccountsRoutes />} />
```

And inside `modules/accounts/routes.ts`, there could be something like:

```tsx
<Routes>
  <Route path="chart-of-accounts" element={<ChartOfAccounts />} />
  <Route path="voucher-entry" element={<VoucherEntry />} />
  ...
</Routes>
```

This **modular routing structure** helps in:

* Separation of concerns
* Better scalability
* Easier feature-specific development

---

### ⛔ Fallback Routes

```tsx
<Route path="*" element={<Navigate to={user ? "/webapp/dashboard" : "/login"} />} />
```

* If the route does not match any path, redirect based on auth status.
* Prevents undefined routes from breaking the app.

---

### 🛠 Add a New Page Route (WebApp)

> Suppose you want to add a new component/page for “User List”.

1. Create component in `src/pages/users/UserList.tsx`
2. Register the route in `index.tsx` inside `/webapp` group:

   ```tsx
   <Route path="users" element={<UserList />} />
   ```
3. Now accessible at: `http://localhost:5173/webapp/users`

---

## 🧩 4. Components Guide

All components are stored in:

```
📁 src/components/
```

These components are reusable, styled with Tailwind CSS, and are used across multiple modules.

---

### 📋 Component Index

| Component                   | Purpose                                     |
| --------------------------- | ------------------------------------------- |
| `Accordion.tsx`             | Expand/collapse sections                    |
| `BoxPanel.tsx`              | Card-style container with title/header      |
| `Button.tsx`                | Reusable button with variants               |
| `Checkbox.tsx`              | Checkbox component                          |
| `CircleRadio.tsx`           | Circular radio selection                    |
| `ComboBox.tsx`              | Select dropdown with search support         |
| `CustomDataTable.tsx`       | Configurable table with rows and sorting    |
| `CustomDatePicker.tsx`      | Date-only picker with consistent design     |
| `CustomDateTimePicker.tsx`  | Date-time picker                            |
| `DropdownAutoSuggest.tsx`   | Auto-suggest dropdown input                 |
| `DropdownButton.tsx`        | Button triggering dropdown list             |
| `Editor.tsx`                | Rich text/WYSIWYG editor                    |
| `ErrorMessage.tsx`          | Red error text for forms                    |
| `FeatherIcon.tsx`           | Icon wrapper (Feather Icons)                |
| `FormField.tsx`             | Label + field wrapper for form consistency  |
| `GooglePagination.tsx`      | Pagination styled like Google's             |
| `GroupBox.tsx`              | Section wrapper, possibly with title/header |
| `Heading.tsx`               | Custom heading (H1, H2...) component        |
| `InputBox.tsx`              | Standard input component                    |
| `Label.tsx`                 | Reusable label text                         |
| `Meta.tsx`                  | SEO meta tag injector (title, desc, etc.)   |
| `Modal.tsx`                 | Dialog modal component                      |
| `MultiSplitPane.tsx`        | Layout splitter with resizable panes        |
| `Pagination.tsx`            | Standard pagination component               |
| `PaginationWithInput.tsx`   | Pagination with jump-to-input               |
| `Panel.tsx`                 | Content panel with border or background     |
| `Paragraph.tsx`             | Styled paragraph component                  |
| `RadioButton.tsx`           | Radio selection button                      |
| `SelectDropdown.tsx`        | Simple dropdown select                      |
| `SimpleInputBox.tsx`        | Very basic input (unstyled maybe)           |
| `SmartForm.tsx`             | Dynamic form renderer (fields from config)  |
| `Switcher.tsx`              | Toggle/switch component                     |
| `Table.tsx`                 | Basic table                                 |
| `Tabs.tsx`                  | Tab switcher component                      |
| `TextareaBox.tsx`           | Multiline input                             |
| `Tooltip.tsx`               | Hover info box                              |

---


#### 📦 `BoxPanel.tsx`

Reusable card-like container with optional header and footer. Perfect for grouping form elements or content blocks.

##### 🧩 Example

```tsx
<BoxPanel title="User Info" footer={<button>Save</button>}>
  <p>Name: Hasan</p>
  <p>Email: hasan@example.com</p>
</BoxPanel>
```

##### ⚙️ Props

| Prop        | Type        | Required | Description                             |
| ----------- | ----------- | -------- | --------------------------------------- |
| `title`     | `string`    | ❌ No     | Title text to display at the top        |
| `children`  | `ReactNode` | ✅ Yes    | Content to render inside the panel      |
| `footer`    | `ReactNode` | ❌ No     | Optional footer section (e.g., buttons) |
| `className` | `string`    | ❌ No     | Extra class for the panel container     |


---


#### 🔘 `Button.tsx`

A flexible and reusable button component that supports navigation (`Link` or `<a>`), multiple visual styles, and sizes.

##### 🧩 Example

```tsx
<Button variant="outlined" size="sm" onClick={() => alert("Clicked!")}>
  Click Me
</Button>

<Button to="/dashboard" variant="flat">
  Go to Dashboard
</Button>

<Button href="https://example.com" size="lg" target="_blank">
  Visit Site
</Button>
```

##### ⚙️ Props

| Prop        | Type                                                        | Required | Description                                          |
| ----------- | ----------------------------------------------------------- | -------- | ---------------------------------------------------- |
| `type`      | `"button"` \| `"submit"` \| `"reset"`                       | ❌ No     | Button type. Default is `"button"`                   |
| `variant`   | `"filled"` \| `"outlined"` \| `"flat"`                      | ❌ No     | Visual style. Default is `"filled"`                  |
| `size`      | `"sm"` \| `"md"` \| `"lg"`                                  | ❌ No     | Size of the button. Default is `"md"`                |
| `className` | `string`                                                    | ❌ No     | Additional custom class names                        |
| `disabled`  | `boolean`                                                   | ❌ No     | Disables the button when true                        |
| `onClick`   | `MouseEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | ❌ No     | Function to run on click                             |
| `children`  | `ReactNode`                                                 | ✅ Yes    | Content inside the button                            |
| `to`        | `string`                                                    | ❌ No     | If set, renders a `Link` for internal navigation     |
| `href`      | `string`                                                    | ❌ No     | If set, renders an anchor (`<a>`) for external links |

📌 **Priority of rendering**:

* If `to` is provided → renders a `Link`
* Else if `href` is provided → renders an `<a>`
* Otherwise → renders a standard `<button>`

---

#### ✅ `Checkbox.tsx`

Customizable checkbox component supporting various shapes, sizes, label styles, and color variants.

##### 🧩 Example

```tsx
<Checkbox
  label="Accept Terms"
  checked={true}
  shape="square"
  size="small"
  dotted
  color="secondary"
  onChange={(val) => console.log("Checked:", val)}
/>
```

##### ⚙️ Props

| Prop       | Type                                 | Required | Description                                                |
| ---------- | ------------------------------------ | -------- | ---------------------------------------------------------- |
| `id`       | `string`                             | ❌ No     | HTML `id` for the checkbox                                 |
| `checked`  | `boolean`                            | ❌ No     | Initial checked state (default: `false`)                   |
| `onChange` | `(checked: boolean) => void`         | ❌ No     | Callback triggered when the checkbox state changes         |
| `label`    | `string`                             | ❌ No     | Optional label to show beside the checkbox                 |
| `shape`    | `"round"` \| `"square"`              | ❌ No     | Checkbox shape (default: `"round"`)                        |
| `dotted`   | `boolean`                            | ❌ No     | If true, label gets a dotted underline hint                |
| `color`    | `"primary"` \| `"secondary"`         | ❌ No     | Color variant for the checked state (default: `"primary"`) |
| `disabled` | `boolean`                            | ❌ No     | Disables interaction if `true`                             |
| `icon`     | `React.ReactNode`                    | ❌ No     | Optional icon shown when checked                           |
| `size`     | `"small"` \| `"medium"` \| `"large"` | ❌ No     | Checkbox size (default: `"medium"`)                        |


---

#### 🔘 `CircleRadio.tsx`

A circular radio button component with optional tooltip, color support, and animation.

##### 🧩 Example

```tsx
<CircleRadio
  name="priority"
  value="high"
  color="bg-red-500"
  checked={selected === 'high'}
  tooltip="High Priority"
  onChange={(val) => setSelected(val)}
  className="shadow-md"
/>
```

##### ⚙️ Props

| Prop        | Type                      | Required | Description                                                           |
| ----------- | ------------------------- | -------- | --------------------------------------------------------------------- |
| `value`     | `string`                  | ✅ Yes    | The value of the radio button                                         |
| `checked`   | `boolean`                 | ❌ No     | Whether the button is selected                                        |
| `onChange`  | `(value: string) => void` | ❌ No     | Callback when radio is selected                                       |
| `color`     | `string`                  | ✅ Yes    | Background color or Tailwind class (e.g. `bg-blue-500`, `gradient-*`) |
| `disabled`  | `boolean`                 | ❌ No     | Disables the radio input                                              |
| `tooltip`   | `string`                  | ❌ No     | Optional tooltip shown on hover                                       |
| `name`      | `string`                  | ✅ Yes    | HTML radio `name` group                                               |
| `className` | `string`                  | ✅ Yes    | Extra styling classes for outer circle                                |

---

#### 🔽 `ComboBox.tsx`

A flexible dropdown/select input supporting both `id` and `name` selection, label positioning, validation, and more.

##### 🧩 Example

```tsx
<ComboBox
  label="Department"
  options={[
    { id: 1, name: "Planning" },
    { id: 2, name: "Merchandising" },
  ]}
  selectedId={2}
  onChange={(id, name) => console.log(id, name)}
  placeholder="Select a department"
  labelPosition="top"
  required
/>
```

##### ⚙️ Props

| Prop              | Type                                                 | Required | Description                                                              |
| ----------------- | ---------------------------------------------------- | -------- | ------------------------------------------------------------------------ |
| `label`           | `string`                                             | ❌ No     | Label to show near the select box                                        |
| `value`           | `number \| null`                                     | ❌ No     | Controlled selected value (overrides internal state)                     |
| `onChange`        | `(id: number \| null, name: string \| null) => void` | ❌ No     | Callback when a new option is selected                                   |
| `options`         | `{ id: number, name: string }[]`                     | ✅ Yes    | The dropdown options                                                     |
| `placeholder`     | `string`                                             | ❌ No     | Placeholder text shown as the first option                               |
| `error`           | `string`                                             | ❌ No     | Error message to show                                                    |
| `labelPosition`   | `"top"` \| `"left"` \| `"right"` \| `"bottom"`       | ❌ No     | Label placement relative to the select (default: `"top"`)                |
| `size`            | `"sm"` \| `"md"` \| `"lg"`                           | ❌ No     | Size variant of the select input (default: `"md"`)                       |
| `is_disabled`     | `boolean`                                            | ❌ No     | Disables the select box                                                  |
| `className`       | `string`                                             | ❌ No     | Extra class for the wrapper                                              |
| `labelClassName`  | `string`                                             | ❌ No     | Extra class for the label                                                |
| `selectClassName` | `string`                                             | ❌ No     | Extra class for the `<select>` element                                   |
| `errorClassName`  | `string`                                             | ❌ No     | Class for the error message (default: red text)                          |
| `required`        | `boolean`                                            | ❌ No     | Appends a red asterisk (\*) if label is present                          |
| `selectedId`      | `number`                                             | ❌ No     | Pre-selected option by `id` (used for uncontrolled initial value)        |
| `selectedName`    | `string`                                             | ❌ No     | Pre-selected option by `name` (fallback if `selectedId` is not provided) |

---

#### 📊 `CustomDataTable.tsx`

A reusable generic data table component with support for configurable columns, column visibility toggle, fixed height/width, and optional bordered style.

##### Example

```tsx
type User = {
  id: number;
  name: string;
  email: string;
};

const columns = [
  { key: "id", header: "ID", width: "w-16", align: "center" },
  { key: "name", header: "Name", width: "w-48" },
  { key: "email", header: "Email", width: "w-64" },
];

const data: User[] = [
  { id: 1, name: "Hasan Mahmud", email: "hasan@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
];

<CustomDataTable
  columns={columns}
  data={data}
  fixedHeight="max-h-64"
  fixedWidth="w-full"
  bordered
  columnsButton
/>
```

##### Props

| Prop             | Type          | Required | Description                                                                                                  |
| ---------------- | ------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `columns`        | `Column<T>[]` | Yes      | Array of column definitions with keys, headers, optional width, alignment, visibility, and custom renderers. |
| `data`           | `T[]`         | Yes      | Array of data objects to render in rows.                                                                     |
| `fixedHeight`    | `string`      | No       | Tailwind CSS class to fix vertical table height with scroll (default: `"max-h-60"`).                         |
| `fixedWidth`     | `string`      | No       | Tailwind CSS class to fix table width (default: `"w-full"`).                                                 |
| `containerClass` | `string`      | No       | Additional CSS classes for the container div.                                                                |
| `tableClass`     | `string`      | No       | Additional CSS classes for the table element.                                                                |
| `bordered`       | `boolean`     | No       | Show border around table and cells (default: `true`).                                                        |
| `columnsButton`  | `boolean`     | No       | Show a toggle button to show/hide columns dynamically (default: `false`).                                    |

##### Column type (`Column<T>`)

| Property  | Type                                             | Required | Description                                               |
| --------- | ------------------------------------------------ | -------- | --------------------------------------------------------- |
| `key`     | `keyof T`                                        | Yes      | Key to access data from each item.                        |
| `header`  | `string`                                         | Yes      | Column header text.                                       |
| `width`   | `string`                                         | No       | Tailwind CSS width class (e.g., `"w-20"`).                |
| `visible` | `boolean`                                        | No       | Initial visibility state of the column (default: `true`). |
| `align`   | `"left" \| "center" \| "right"`                  | No       | Text alignment in cells (default: `"left"`).              |
| `render`  | `(item: T, rowIndex: number) => React.ReactNode` | No       | Optional custom render function for cell content.         |

---

#### 📅 `CustomDatePicker.tsx`

Wrapper around `react-datepicker` with consistent styles and customizable format.

##### Example

```tsx
<CustomDatePicker
  selected={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  dateFormat="yyyy-MM-dd"
/>
```

##### Props

| Prop         | Type                           | Required | Description                              |
| ------------ | ------------------------------ | -------- | ---------------------------------------- |
| `selected`   | `Date \| null`                 | Yes      | Currently selected date                  |
| `onChange`   | `(date: Date \| null) => void` | Yes      | Callback called on date change           |
| `dateFormat` | `string`                       | Yes      | Date format string (e.g. `"yyyy-MM-dd"`) |
| `className`  | `string`                       | No       | Additional CSS classes for input styling |

---

#### 📅 `CustomDateTimePicker.tsx`

A date-time picker wrapping `react-datepicker` with time selection, configurable intervals, and consistent styling.

##### Example

```tsx
const [dateTime, setDateTime] = React.useState<Date | null>(null);

<CustomDateTimePicker
  selected={dateTime}
  onChange={setDateTime}
  dateFormat="yyyy-MM-dd h:mm aa"
  showTimeSelect={true}
  timeIntervals={15}
/>
```

##### Props

| Prop             | Type                           | Required | Description                                                               |
| ---------------- | ------------------------------ | -------- | ------------------------------------------------------------------------- |
| `selected`       | `Date \| null`                 | Yes      | Currently selected date and time                                          |
| `onChange`       | `(date: Date \| null) => void` | Yes      | Callback fired when date or time changes                                  |
| `dateFormat`     | `string`                       | No       | Format string for date and time display (default: `"yyyy-MM-dd h:mm aa"`) |
| `showTimeSelect` | `boolean`                      | No       | Whether to show time selector (default: `true`)                           |
| `timeIntervals`  | `number`                       | No       | Time selection intervals in minutes (default: `15`)                       |

---


#### 🔽 `DropdownAutoSuggest.tsx`

Auto-suggest dropdown component that filters data from Redux state as the user types. Useful for searching and selecting from large datasets.

##### 🧩 Example

```tsx
<DropdownAutoSuggest
  name="countries"
  value="Bangladesh"
  onSelect={(val, label) => console.log("Selected:", val, label)}
  inputWidth={300}
/>
```

##### ⚙️ Props

| Prop         | Type                               | Required | Description                                                               |
| ------------ | ---------------------------------- | -------- | ------------------------------------------------------------------------- |
| `name`       | `string`                           | ✅ Yes    | Redux slice key to fetch dropdown data (e.g., `countries`, `departments`) |
| `onSelect`   | `(value: any, label: any) => void` | ❌ No     | Callback when a dropdown item is selected                                 |
| `className`  | `string`                           | ❌ No     | Extra classes for styling the input                                       |
| `inputWidth` | `number`                           | ❌ No     | Pixel width for the dropdown suggestion list                              |
| `value`      | `string`                           | ❌ No     | Initial value to show in the input                                        |

##### 📦 Data Source Shape (Redux Slice)

The component expects Redux state as:

```ts
dropdown: {
  countries: {
    data: [
      { label: 'Bangladesh', value: 'BD' },
      { label: 'India', value: 'IN' }
    ],
    labelKey: 'label',
    valueKey: 'value'
  }
}
```

---

#### 🔘 `DropdownButton.tsx`

A reusable dropdown button with configurable label, icon, sizes, and custom dropdown content. Handles outside clicks to close the dropdown.

##### Example

```tsx
<DropdownButton label="Actions" icon={<SomeIcon />} size="md">
  <ul>
    <li>Option 1</li>
    <li>Option 2</li>
  </ul>
</DropdownButton>
```

##### Props

| Prop        | Type                   | Required | Description                                                     |
| ----------- | ---------------------- | -------- | --------------------------------------------------------------- |
| `label`     | `string`               | No       | Text label displayed on the button (default: `"Options"`)       |
| `children`  | `ReactNode`            | Yes      | Content to show inside the dropdown menu                        |
| `icon`      | `ReactNode`            | No       | Icon component shown before the label                           |
| `className` | `string`               | No       | Additional CSS classes for the button                           |
| `size`      | `"sm" \| "md" \| "lg"` | No       | Size of the button, affects padding/font size (default: `"md"`) |

---

Here are the docs for your `ErrorMessage` component in the same format:

---

#### ⚠️ `ErrorMessage.tsx`

Simple component to display an error message with styled red text.

##### Example

```tsx
<ErrorMessage message="Please enter a valid email address." />
```

##### Props

| Prop      | Type     | Required | Description                       |
| --------- | -------- | -------- | --------------------------------- |
| `message` | `string` | Yes      | The error message text to display |

---


#### 🎨 `FeatherIcon.tsx`

Wrapper component for rendering Feather icons with optional styling and additional props.

##### Example

```tsx
import { PlusCircle } from "react-feather";

<FeatherIcon icon={PlusCircle} className="text-blue-500" size={24} />
```

##### Props

| Prop        | Type                                                 | Required | Description                                                                 |
| ----------- | ---------------------------------------------------- | -------- | --------------------------------------------------------------------------- |
| `icon`      | `React.ComponentType<React.SVGProps<SVGSVGElement>>` | Yes      | Feather icon component to render                                            |
| `className` | `string`                                             | No       | Additional CSS classes for styling                                          |
| ...props    | `any`                                                | No       | Any other valid SVG or React props (e.g., `onClick`, `size`, `strokeWidth`) |

---

#### 📝 `FormField.tsx`

A flexible form field wrapper that renders a label and an input/select element with optional inline or block layout, ref forwarding, and styling options.

##### Example

```tsx
<FormField label="Username" id="username" required variant="inline" labelBold>
  <input type="text" id="username" className="border rounded px-2 py-1" />
</FormField>
```

##### Props

| Prop            | Type                  | Required | Description                                                                                |
| --------------- | --------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `label`         | `string`              | Yes      | Text to display as the field label                                                         |
| `id`            | `string`              | Yes      | The `id` attribute for the input/select, linked to the label                               |
| `children`      | `ReactElement`        | Yes      | The input/select element to be rendered                                                    |
| `variant`       | `"inline" \| "block"` | No       | Layout style: inline (label and input side-by-side) or block (stacked). Default: `"block"` |
| `required`      | `boolean`             | No       | Whether to display a red asterisk for required fields                                      |
| `labelWidth`    | `string`              | No       | Tailwind width class for label (default: `"w-32"`)                                         |
| `labelFontSize` | `string`              | No       | Additional font size classes for label                                                     |
| `labelBold`     | `boolean`             | No       | Whether to make label text bold                                                            |
| `dd`            | `boolean`             | No       | (Unused in current code)                                                                   |

---

### `GooglePagination`

A customizable pagination component inspired by Google's style, showing a range of page buttons with ellipsis when pages are truncated.

#### Props

| Name              | Type                     | Default | Description                                         |
| ----------------- | ------------------------ | ------- | --------------------------------------------------- |
| `currentPage`     | `number`                 | —       | The current active page number                      |
| `totalPages`      | `number`                 | —       | Total number of pages available                     |
| `onPageChange`    | `(page: number) => void` | —       | Callback invoked when the user clicks a page button |
| `className`       | `string`                 | `""`    | Additional CSS classes for the root container       |
| `maxVisiblePages` | `number`                 | `5`     | Maximum number of page buttons visible at once      |

---

#### Behavior

* Shows "Previous" and "Next" buttons, disabled at bounds.
* Displays a sliding window of page numbers around the current page.
* Displays first and last page buttons if not in the visible range, with ellipsis (`...`) to indicate skipped pages.
* Highlights the current page with a distinct style.

---

#### Usage Example

```tsx
import React, { useState } from "react";
import GooglePagination from "./GooglePagination";

const App = () => {
  const [page, setPage] = useState(1);
  const totalPages = 20;

  return (
    <div>
      <GooglePagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        maxVisiblePages={7}
        className="my-4"
      />
      <p>Current page: {page}</p>
    </div>
  );
};

export default App;
```

---

Sure! Here is the component documentation for your `GroupBox` component in the requested format:

---

### `GroupBox`

A styled fieldset container component with a legend title. It supports forwarding a ref to the underlying `<fieldset>` element and accepts custom class names.

#### Props

| Name        | Type              | Default | Description                                 |
| ----------- | ----------------- | ------- | ------------------------------------------- |
| `title`     | `string`          | —       | The text displayed as the legend/title      |
| `children`  | `React.ReactNode` | —       | The content inside the fieldset             |
| `className` | `string`          | `""`    | Additional CSS classes to customize styling |

---

#### Behavior

* Wraps children inside a semantic `<fieldset>` with a `<legend>` displaying the `title`.
* Applies default border, padding, rounded corners, and dark mode styles.
* Accepts forwarded ref pointing to the `<fieldset>` element.
* Merges additional CSS classes passed via `className`.

---

#### Usage Example

```tsx
import React, { useRef } from "react";
import GroupBox from "./GroupBox";

const Example = () => {
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);

  return (
    <GroupBox
      ref={fieldsetRef}
      title="User Information"
      className="max-w-md mx-auto mt-6"
    >
      <p>This is some content inside the GroupBox.</p>
    </GroupBox>
  );
};

export default Example;
```

---


### `Heading`

A flexible heading component that renders semantic HTML heading tags (`h1` through `h6`) with consistent typography styles based on the heading level. Supports custom class names for additional styling.

#### Props

| Name        | Type        | Default | Description                                 |   |   |     |     |                                            |
| ----------- | ----------- | ------- | ------------------------------------------- | - | - | --- | --- | ------------------------------------------ |
| `level`     | \`1         | 2       | 3                                           | 4 | 5 | 6\` | `1` | The heading level to render (`h1` to `h6`) |
| `className` | `string`    | `""`    | Additional CSS classes to customize styling |   |   |     |     |                                            |
| `children`  | `ReactNode` | —       | The content/text inside the heading         |   |   |     |     |                                            |

---

#### Behavior

* Renders the appropriate heading tag (`<h1>`, `<h2>`, etc.) based on the `level` prop.
* Applies predefined font size and weight styles according to the heading level.
* Merges any additional CSS classes passed via `className`.
* Defaults to rendering an `<h1>` tag if no `level` is specified.

---

#### Usage Example

```tsx
import React from "react";
import Heading from "./Heading";

const Example = () => (
  <div>
    <Heading level={1}>Main Title</Heading>
    <Heading level={2} className="text-blue-600">
      Section Title
    </Heading>
    <Heading level={3}>Subsection Title</Heading>
  </div>
);

export default Example;
```

---


### `InputBox`

A versatile, styled input component with support for multiple input types, optional labels positioned around the input, icons, themes, sizes, clear button, and flexible styling options.

#### Props

| Name              | Type                                                 | Default                            | Description                                                   |
| ----------------- | ---------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------- |
| `label`           | `string`                                             | —                                  | Optional label text associated with the input                 |
| `type`            | `InputType` (`string`)                               | —                                  | Input field type, e.g., `"text"`, `"number"`, `"email"`, etc. |
| `value`           | `string \| number`                                   | —                                  | Current value of the input                                    |
| `onChange`        | `(e: React.ChangeEvent<HTMLInputElement>) => void`   | —                                  | Callback when input value changes                             |
| `onFocus`         | `(e: React.FocusEvent<HTMLInputElement>) => void`    | —                                  | Callback when input gains focus                               |
| `onBlur`          | `(e: React.FocusEvent<HTMLInputElement>) => void`    | —                                  | Callback when input loses focus                               |
| `onKeyDown`       | `(e: React.KeyboardEvent<HTMLInputElement>) => void` | —                                  | Callback on key press inside input                            |
| `placeholder`     | `string`                                             | —                                  | Placeholder text inside the input                             |
| `icon`            | `React.ReactNode`                                    | —                                  | Optional icon displayed inside the input on the left          |
| `labelPosition`   | `"top" \| "left" \| "right" \| "bottom"`             | `"left"`                           | Position of the label relative to the input                   |
| `theme`           | `"light" \| "dark"`                                  | `"light"`                          | Input theme affecting background and text colors              |
| `size`            | `"sm" \| "base" \| "lg"`                             | `"base"`                           | Input size affecting padding and font size                    |
| `borderStyle`     | `string`                                             | `"border-gray-300"`                | Tailwind border color and style classes                       |
| `rounded`         | `boolean`                                            | `true`                             | Whether the input and label have rounded corners              |
| `className`       | `string`                                             | `""`                               | Additional classes applied to the root container              |
| `labelClassName`  | `string`                                             | `"px-1"`                           | Additional classes applied to the label                       |
| `inputClassName`  | `string`                                             | `""`                               | Additional classes applied to the input element               |
| `is_disabled`     | `boolean`                                            | `false`                            | Whether the input is disabled                                 |
| `showClearButton` | `boolean`                                            | `true`                             | Whether to show a clear (X) button when input has value       |
| `onClear`         | `() => void`                                         | —                                  | Callback invoked when the clear button is clicked             |
| `labelWidth`      | `string`                                             | `label ? "w-[30%]" : "w-0 hidden"` | Width style for the label container                           |
| `inputWidth`      | `string`                                             | `label ? "w-[70%]" : "w-full"`     | Width style for the input container                           |

---

#### Behavior

* Displays an input field styled with Tailwind CSS, supporting light and dark themes.
* Labels can be positioned on top, left, right, or bottom relative to the input.
* Shows an optional icon inside the input on the left side.
* Supports three sizes (`sm`, `base`, `lg`) for different paddings and font sizes.
* If `showClearButton` is `true`, and input is not disabled and has a non-empty value, shows a clear (X) button to reset the input via the `onClear` callback.
* Uses `clsx` for composing CSS classes dynamically.
* Supports disabled state.
* Label and input containers’ widths are customizable via `labelWidth` and `inputWidth`.
* Supports passing custom classes for root, label, and input elements.

---

#### Usage Example

```tsx
import React, { useState } from "react";
import { Search } from "react-feather";
import InputBox from "./InputBox";

const Example = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleClear = () => setSearchTerm("");

  return (
    <div className="max-w-md mx-auto mt-8">
      <InputBox
        label="Search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type to search..."
        icon={<Search />}
        labelPosition="left"
        theme="light"
        size="base"
        showClearButton={true}
        onClear={handleClear}
        rounded={true}
        className="mb-4"
      />
    </div>
  );
};

export default Example;
```

---


### `Label`

A flexible label component that supports positioning relative to form inputs, shows required field asterisk, disabled styles, and accessibility association via `htmlFor`.

#### Props

| Name        | Type                                     | Default | Description                                                       |
| ----------- | ---------------------------------------- | ------- | ----------------------------------------------------------------- |
| `text`      | `string`                                 | —       | The label text to display                                         |
| `position`  | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Position of the label relative to the associated input            |
| `required`  | `boolean`                                | `false` | Whether to show a red asterisk indicating required                |
| `disabled`  | `boolean`                                | `false` | Whether the label appears disabled (faded and not-allowed cursor) |
| `className` | `string`                                 | `""`    | Additional CSS classes for the label                              |
| `htmlFor`   | `string`                                 | —       | ID of the input this label is associated with (for accessibility) |

---

#### Behavior

* Renders a `<label>` HTML element with customizable text and styles.
* Adjusts margin to visually position the label based on the `position` prop.
* Displays a red asterisk (`*`) if `required` is true.
* Applies disabled styling (opacity and cursor) when `disabled` is true.
* Supports linking to an input field via the `htmlFor` attribute for improved accessibility.

---

#### Usage Example

```tsx
import React from "react";
import Label from "./Label";

const Example = () => (
  <form>
    <div>
      <Label text="Username" position="top" required htmlFor="username" />
      <input id="username" type="text" />
    </div>

    <div style={{ display: "flex", alignItems: "center", marginTop: 16 }}>
      <Label text="Remember me" position="left" />
      <input type="checkbox" />
    </div>

    <div style={{ marginTop: 16 }}>
      <Label text="Disabled Label" disabled />
      <input type="text" disabled />
    </div>
  </form>
);

export default Example;
```

---

### `Meta`

A React component for managing SEO meta tags and Open Graph data using `react-helmet`. It dynamically sets the document `<title>`, description, keywords, canonical URL, and social sharing image metadata.

#### Props

| Name           | Type     | Default | Description                                                  |
| -------------- | -------- | ------- | ------------------------------------------------------------ |
| `title`        | `string` | —       | The document title displayed in the browser tab              |
| `description`  | `string` | —       | Meta description for SEO and social previews                 |
| `keywords`     | `string` | —       | Comma-separated SEO keywords                                 |
| `canonicalUrl` | `string` | —       | Canonical URL for the page to avoid duplicate content issues |
| `image`        | `string` | —       | URL to an image used for Open Graph previews                 |

---

#### Behavior

* Sets the page `<title>` dynamically.
* Inserts standard meta tags: `description` and `keywords`.
* Inserts a `<link rel="canonical">` tag if a canonical URL is provided.
* Adds Open Graph meta tags (`og:title`, `og:description`, `og:image`, `og:url`) for rich social media previews.
* Uses the current page URL for `og:url` dynamically from `window.location.href`.

---

#### Usage Example

```tsx
import React from "react";
import Meta from "./Meta";

const HomePage = () => (
  <>
    <Meta
      title="Home - My Website"
      description="Welcome to my awesome website homepage."
      keywords="home, awesome website, react"
      canonicalUrl="https://www.mywebsite.com/"
      image="https://www.mywebsite.com/og-image.jpg"
    />
    <main>
      <h1>Welcome!</h1>
      {/* page content */}
    </main>
  </>
);

export default HomePage;
```

---


### `Modal`

A responsive modal dialog component with dark mode support and customizable width and height classes. It uses React Portal to render outside the main app DOM hierarchy.

#### Props

| Name          | Type              | Default          | Description                                               |
| ------------- | ----------------- | ---------------- | --------------------------------------------------------- |
| `isOpen`      | `boolean`         | —                | Controls whether the modal is visible                     |
| `onClose`     | `() => void`      | —                | Callback function to close the modal                      |
| `children`    | `React.ReactNode` | —                | Modal content to render inside                            |
| `widthClass`  | `WidthClass`      | `"max-w-md"`     | Tailwind CSS max-width utility classes to set modal width |
| `heightClass` | `HeightClass`     | `"max-h-[80vh]"` | Tailwind CSS height utility classes to set modal height   |

---

#### Behavior

* Renders modal content into a DOM node with id `modal-root` using React Portal.
* Shows/hides modal based on `isOpen` prop.
* Detects user's preferred color scheme (`dark` or `light`) and adjusts overlay and modal styles accordingly.
* Supports smooth opacity and scale transitions when opening and closing.
* Includes a header with a title and close (`×`) button.
* Includes a footer with a Close button that triggers `onClose`.
* Overlay dims background with blur effect.
* Modal width and height can be customized with Tailwind CSS classes.
* Accessible: associates close buttons with proper click handlers.

---

#### Usage Example

```tsx
import React, { useState } from "react";
import Modal from "./Modal";

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">
        Open Modal
      </button>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        widthClass="max-w-lg"
        heightClass="max-h-screen"
      >
        <p>This is the modal content.</p>
      </Modal>
    </>
  );
};

export default App;
```

---


### Pagination Component

A simple, accessible pagination control with **Previous** and **Next** buttons and a page indicator.

---

#### Props

| Name           | Type                     | Required | Description                              |
| -------------- | ------------------------ | -------- | ---------------------------------------- |
| `currentPage`  | `number`                 | Yes      | The current active page number           |
| `totalPages`   | `number`                 | Yes      | Total number of pages available          |
| `onPageChange` | `(page: number) => void` | Yes      | Callback invoked when the page changes   |
| `className`    | `string`                 | No       | Additional CSS classes for the container |

---

#### Features

* Disables **Previous** button on the first page.
* Disables **Next** button on the last page.
* Shows current page and total pages count.
* Uses basic styling with Tailwind CSS utility classes.
* Buttons are keyboard accessible and disabled state has reduced opacity.

---

#### Usage Example

```tsx
import React, { useState } from "react";
import Pagination from "./Pagination";

const Example = () => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      currentPage={page}
      totalPages={10}
      onPageChange={setPage}
      className="my-4"
    />
  );
};

export default Example;
```

---

### `PaginationWithInput`

A compact and accessible pagination component with input-based page navigation. Allows users to type in a page number or use **Previous/Next** buttons to navigate between pages.

#### Props

| Name           | Type                     | Default | Description                                                |
| -------------- | ------------------------ | ------- | ---------------------------------------------------------- |
| `currentPage`  | `number`                 | —       | The current active page (1-based index)                    |
| `totalPages`   | `number`                 | —       | Total number of available pages                            |
| `onPageChange` | `(page: number) => void` | —       | Callback fired with the new page number when page changes  |
| `className`    | `string`                 | `""`    | Optional Tailwind CSS classes for the pagination container |

---

#### Behavior

* **Previous** and **Next** buttons enable easy step-based navigation.
* A numeric input field allows direct page entry.
* Automatically disables navigation buttons when on the first or last page.
* Submitting an invalid page number will reset the input to the current page.
* Syncs input field with `currentPage` using `useEffect`.
* Supports keyboard-friendly form submission and mobile-friendly UI.
* Styled using Tailwind CSS with sensible defaults and disabled state handling.

---

#### Usage Example

```tsx
import React, { useState } from "react";
import PaginationWithInput from "./PaginationWithInput";

const App = () => {
  const [page, setPage] = useState(1);

  return (
    <div className="p-4">
      <PaginationWithInput
        currentPage={page}
        totalPages={10}
        onPageChange={(newPage) => setPage(newPage)}
        className="mt-4"
      />
    </div>
  );
};

export default App;
```

---

### `Panel`

A flexible, styled panel component with optional header, footer, collapsible content, and rounded corners. Fully customizable with Tailwind CSS classes for layout consistency and design flexibility.

#### Props

| Name               | Type                             | Default | Description                                                  |
| ------------------ | -------------------------------- | ------- | ------------------------------------------------------------ |
| `header`           | `React.ReactNode`                | —       | Content to render in the panel header                        |
| `footer`           | `React.ReactNode`                | —       | Content to render in the panel footer                        |
| `children`         | `React.ReactNode`                | —       | Panel body content                                           |
| `className`        | `string`                         | `""`    | Additional Tailwind classes for the root panel container     |
| `headerClassName`  | `string`                         | `""`    | Tailwind classes for customizing the header area             |
| `footerClassName`  | `string`                         | `""`    | Tailwind classes for customizing the footer area             |
| `contentClassName` | `string`                         | `""`    | Tailwind classes for customizing the content area            |
| `isCollapsible`    | `boolean`                        | `false` | Whether the panel can be collapsed/expanded via header click |
| `defaultCollapsed` | `boolean`                        | `false` | Initial collapsed state if `isCollapsible` is `true`         |
| `onToggleCollapse` | `(isCollapsed: boolean) => void` | —       | Callback fired when panel collapses or expands               |
| `rounded`          | `boolean`                        | `true`  | Whether the panel should have rounded corners                |

---

#### Behavior

* Displays a **header** (if provided) with optional collapse/expand toggle when `isCollapsible` is true.
* Collapsed state toggled by clicking the header area.
* The **footer** is only shown when not collapsed.
* When `rounded` is true, the panel has Tailwind's `rounded-lg` class, adjusting rounded corners on header/content/footer based on their visibility.
* Automatically adds `shadow-lg` to the panel for depth.
* **Customizable** via className props (`className`, `headerClassName`, `footerClassName`, `contentClassName`).
* **Accessible** collapse/expand icon using semantic `<button>`.

---

#### Usage Example

```tsx
import React from "react";
import Panel from "./Panel";

const Example = () => {
  return (
    <Panel
      header={<span className="font-semibold">User Info</span>}
      footer={<button className="text-sm text-blue-600">Save</button>}
      isCollapsible
      defaultCollapsed={false}
      onToggleCollapse={(collapsed) => console.log("Collapsed:", collapsed)}
      className="bg-white dark:bg-gray-800"
    >
      <p>This panel contains user information.</p>
    </Panel>
  );
};

export default Example;
```

---

### `Paragraph`

A reusable text component for rendering styled paragraphs. Provides consistent typography and spacing using Tailwind CSS, while allowing further customization through class names.

#### Props

| Name        | Type        | Default | Description                                               |
| ----------- | ----------- | ------- | --------------------------------------------------------- |
| `children`  | `ReactNode` | —       | The paragraph text or content to display                  |
| `className` | `string`    | `""`    | Optional Tailwind CSS classes to customize the appearance |

---

#### Behavior

* Renders a `<p>` element with:

  * `text-base`: base font size
  * `text-gray-700`: default text color for good readability
  * `leading-relaxed`: relaxed line-height for better legibility
* Uses `clsx` for conditional class merging, allowing custom styling without losing base styles.
* Flexible and composable: can be used across pages, modals, cards, and other components where consistent text formatting is needed.

---

#### Usage Example

```tsx
import Paragraph from "./Paragraph";

const Example = () => {
  return (
    <Paragraph className="mb-4">
      This is a reusable paragraph component with consistent styling.
    </Paragraph>
  );
};

export default Example;
```

---

### `RadioButton`

A flexible and stylable radio button component that supports custom labels, sizes, colors, icons, and group behavior. Built with accessibility and responsiveness in mind using Tailwind CSS.

#### Props

| Name       | Type                                 | Default     | Description                                                 |
| ---------- | ------------------------------------ | ----------- | ----------------------------------------------------------- |
| `label`    | `string`                             | —           | Optional label text shown next to the radio button          |
| `checked`  | `boolean`                            | `false`     | Whether the radio button is initially selected              |
| `onChange` | `(checked: boolean) => void`         | —           | Callback triggered when radio state changes                 |
| `value`    | `string`                             | —           | The value of the radio button                               |
| `name`     | `string`                             | —           | Name used to group radio buttons together                   |
| `size`     | `"small"` \| `"medium"` \| `"large"` | `"medium"`  | Size of the radio button (affects width, height, font size) |
| `color`    | `"primary"` \| `"secondary"`         | `"primary"` | Color variant used when the radio is selected               |
| `icon`     | `React.ReactNode`                    | —           | Optional icon displayed when the radio is checked           |
| `disabled` | `boolean`                            | `false`     | Disables the radio button and dims the appearance           |

---

#### Behavior

* Uses **controlled internal state** to track selection and notify parent via `onChange`.
* Applies **custom styles** based on `size` and `color` props using Tailwind CSS.
* When `icon` is provided and the radio is checked, the icon is rendered to the right of the label.
* Fully accessible: uses native `<input type="radio">` element with proper `name` grouping.
* When `disabled`, pointer events are blocked and the component is visually dimmed.

---

#### Usage Example

```tsx
import RadioButton from "./RadioButton";
import { CheckCircle } from "react-feather";

const Example = () => {
  return (
    <div className="space-y-4">
      <RadioButton
        name="options"
        value="option1"
        label="Option 1"
        checked={true}
        onChange={(checked) => console.log("Option 1 selected:", checked)}
        size="medium"
        color="primary"
        icon={<CheckCircle className="text-blue-500 w-4 h-4" />}
      />

      <RadioButton
        name="options"
        value="option2"
        label="Option 2"
        size="small"
        color="secondary"
        disabled
      />
    </div>
  );
};

export default Example;
```

---

### `SelectDropdown`

A reusable, generic, and fully customizable dropdown/select component that supports custom object-based options, Tailwind variants, dynamic sizing, and `forwardRef`.

#### Props

| Name             | Type                                            | Default          | Description                                                                   |
| ---------------- | ----------------------------------------------- | ---------------- | ----------------------------------------------------------------------------- |
| `options`        | `T[]`                                           | —                | The list of options to render                                                 |
| `value`          | `string`                                        | —                | Currently selected value                                                      |
| `onChange`       | `(value: string, item?: T) => void`             | —                | Callback invoked when the selected value changes                              |
| `isSameKeyValue` | `boolean`                                       | `true`           | If true, options are primitive values; otherwise, use `valueKey` & `labelKey` |
| `valueKey`       | `keyof T`                                       | —                | Key from the object to use as value                                           |
| `labelKey`       | `keyof T`                                       | —                | Key from the object to use as label                                           |
| `placeholder`    | `string`                                        | `"-- Select --"` | Placeholder text for the unselected state                                     |
| `variant`        | `"default"` \| `"flat"` \| `"bordered"`         | `"default"`      | Visual style variant                                                          |
| `className`      | `string`                                        | `""`             | Additional Tailwind CSS classes                                               |
| `onKeyDown`      | `React.KeyboardEventHandler<HTMLSelectElement>` | —                | Key down handler                                                              |
| `disabled`       | `boolean`                                       | `false`          | Disable the dropdown                                                          |

---

#### Behavior

* Supports both primitive options (like `string[]`) and object-based options using `valueKey` and `labelKey`.
* Dynamically adjusts `text-size` based on the height class in `className`.
* Tailwind-based visual styling with variants:

  * `default`: light gray border
  * `flat`: borderless, minimal
  * `bordered`: bold border with primary color
* Uses `forwardRef` for form integrations or custom focus handling.
* Triggers `onChange` with the selected string value and matching item object (if applicable).
* Renders a placeholder option at the top.
* Dark mode–friendly text coloring.

---

#### Usage Example

```tsx
import SelectDropdown from "./SelectDropdown";

interface Option {
  id: string;
  name: string;
}

const options: Option[] = [
  { id: "1", name: "Option A" },
  { id: "2", name: "Option B" },
];

const Example = () => {
  const [selected, setSelected] = React.useState("");

  return (
    <SelectDropdown<Option>
      options={options}
      value={selected}
      onChange={(val, item) => {
        setSelected(val);
        console.log("Selected item:", item);
      }}
      valueKey="id"
      labelKey="name"
      variant="bordered"
      className="h-10 w-64"
    />
  );
};
```

---

### `SimpleInputBox`

A reusable, customizable, and style-consistent input field component using `forwardRef`, built with TailwindCSS and full control over common input props.

---

#### Props

| Prop          | Type                                        | Default      | Description                                              |
| ------------- | ------------------------------------------- | ------------ | -------------------------------------------------------- |
| `id`          | `string`                                    | —            | HTML `id` attribute for the input                        |
| `name`        | `string`                                    | —            | HTML `name` attribute                                    |
| `type`        | `string`                                    | `"text"`     | Input type (e.g., `"text"`, `"email"`, `"number"`, etc.) |
| `value`       | `string`                                    | **Required** | Current input value                                      |
| `onChange`    | `(value: string) => void`                   | **Required** | Called when the input value changes                      |
| `onFocus`     | `React.FocusEventHandler<HTMLInputElement>` | —            | Focus event handler                                      |
| `onBlur`      | `React.FocusEventHandler<HTMLInputElement>` | —            | Blur event handler                                       |
| `placeholder` | `string`                                    | `""`         | Placeholder text                                         |
| `variant`     | `"default"` \| `"flat"` \| `"bordered"`     | `"default"`  | Visual style of the input                                |
| `className`   | `string`                                    | `""`         | Additional TailwindCSS classes                           |
| `disabled`    | `boolean`                                   | `false`      | Disables input if true                                   |
| `required`    | `boolean`                                   | `false`      | Makes the field required                                 |
| `readOnly`    | `boolean`                                   | `false`      | Makes the field read-only                                |
| `autoFocus`   | `boolean`                                   | `false`      | Auto-focus the field on render                           |
| `maxLength`   | `number`                                    | —            | Maximum number of characters allowed                     |
| `minLength`   | `number`                                    | —            | Minimum number of characters required                    |
| `pattern`     | `string`                                    | —            | RegEx pattern for validation                             |

---

#### Variants

| Variant    | Description                                |
| ---------- | ------------------------------------------ |
| `default`  | Light border with gray, supports dark mode |
| `flat`     | No border, only text color visible         |
| `bordered` | Thicker blue border for emphasis           |

---

#### ✅ Example

```tsx
import SimpleInputBox from "./SimpleInputBox";

const Example = () => {
  const [email, setEmail] = useState("");

  return (
    <SimpleInputBox
      id="user-email"
      name="email"
      type="email"
      value={email}
      onChange={(val) => setEmail(val)}
      placeholder="Enter your email"
      variant="bordered"
      className="w-full h-10"
      required
    />
  );
};
```

---

### `SmartForm`

A form utility wrapper that enables programmatic navigation between form inputs using `focusNext()` and `focusPrev()` methods exposed via a `ref`. Designed to improve keyboard accessibility and control over custom input flows.

#### Props

| Name        | Type                                                       | Default | Description                                                                     |
| ----------- | ---------------------------------------------------------- | ------- | ------------------------------------------------------------------------------- |
| `children`  | `React.ReactNode`                                          | —       | The form content, typically a set of inputs or custom input components.         |
| `inputRefs` | `React.RefObject<HTMLInputElement \| HTMLSelectElement>[]` | `[]`    | An array of refs corresponding to the form inputs you want to navigate through. |

---

#### Imperative Handle

| Method        | Type         | Description                                                         |
| ------------- | ------------ | ------------------------------------------------------------------- |
| `focusNext()` | `() => void` | Moves focus to the next input element in the `inputRefs` array.     |
| `focusPrev()` | `() => void` | Moves focus to the previous input element in the `inputRefs` array. |

---

#### Behavior

* Accepts an array of refs via `inputRefs`, which it listens to for managing input focus order.
* Uses `document.activeElement` to detect the currently focused input and moves focus accordingly.
* Intended for use with custom keyboard navigation setups in complex forms.
* Does **not** render any DOM elements beyond a `<div>` wrapper—purely a utility component.

---

#### Usage Example

```tsx
import React, { useRef } from "react";
import SmartForm, { SmartFormHandle } from "./SmartForm";

const ExampleForm = () => {
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);
  const formRef = useRef<SmartFormHandle>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      formRef.current?.focusNext();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      formRef.current?.focusPrev();
    }
  };

  return (
    <SmartForm
      ref={formRef}
      inputRefs={[input1Ref, input2Ref, input3Ref]}
    >
      <input
        ref={input1Ref}
        onKeyDown={handleKeyDown}
        placeholder="First Name"
        className="input"
      />
      <input
        ref={input2Ref}
        onKeyDown={handleKeyDown}
        placeholder="Last Name"
        className="input"
      />
      <input
        ref={input3Ref}
        onKeyDown={handleKeyDown}
        placeholder="Email"
        className="input"
      />
    </SmartForm>
  );
};

export default ExampleForm;
```

---

### `Switcher`

A customizable toggle switch component with support for multiple sizes, colors, disabled state, and an optional label. It handles controlled and uncontrolled checked state internally and provides a smooth animated thumb transition.

#### Props

| Name       | Type                             | Default    | Description                                                   |
| ---------- | -------------------------------- | ---------- | ------------------------------------------------------------- |
| `checked`  | `boolean`                        | `false`    | Initial checked state of the switch (uncontrolled mode).      |
| `onChange` | `(checked: boolean) => void`     | —          | Callback fired when the switch is toggled, passing new state. |
| `size`     | `"small" \| "medium" \| "large"` | `"medium"` | Size of the switch track and thumb.                           |
| `disabled` | `boolean`                        | `false`    | Whether the switch is disabled (non-interactive).             |
| `label`    | `string`                         | —          | Optional label rendered next to the switch.                   |
| `color`    | `"blue" \| "green" \| "red"`     | `"blue"`   | Color of the switch track when checked.                       |

---

#### Behavior

* Toggles between on/off states with smooth sliding thumb animation.
* Disabled state prevents toggling and dims the switch visually.
* Supports three sizes with different widths and heights.
* The track color changes based on the `color` prop when checked; defaults to gray when unchecked.
* The component manages its own internal checked state initialized from `checked` prop.
* Calls `onChange` callback when toggled, enabling controlled usage patterns.
* The switch is accessible with hidden checkbox input and proper `aria-label`.

---

#### Usage Example

```tsx
import React, { useState } from "react";
import Switcher from "./Switcher";

const Example = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <Switcher
        checked={enabled}
        onChange={setEnabled}
        size="large"
        color="green"
        label="Enable notifications"
      />
      <p>Notifications are {enabled ? "enabled" : "disabled"}</p>
    </div>
  );
};

export default Example;
```

---

### `Tabs`

A simple and responsive tab component that displays tab buttons and renders the content of the currently active tab. Supports dynamic tabs with labels and React nodes as content.

#### Props

| Name   | Type        | Default | Description                                                 |
| ------ | ----------- | ------- | ----------------------------------------------------------- |
| `tabs` | `TabItem[]` | —       | Array of tab objects with `label` and `content` properties. |

---

#### Behavior

* Renders a horizontal list of tab buttons with styling indicating the active tab.
* Clicking a tab button sets that tab as active and displays its content below.
* Only the content of the active tab is rendered.
* Uses internal state (`activeIndex`) to track the currently selected tab.
* Tabs fill the container width and adapt responsively.
* Active tab styled with blue background and white text; inactive tabs with border and gray text.

---

#### Usage Example

```tsx
import React from "react";
import Tabs from "./Tabs";

const tabData = [
  { label: "Home", content: <div>Welcome to the home tab</div> },
  { label: "Profile", content: <div>User profile information here</div> },
  { label: "Settings", content: <div>Adjust your preferences</div> },
];

const Example = () => {
  return (
    <div className="max-w-md mx-auto">
      <Tabs tabs={tabData} />
    </div>
  );
};

export default Example;
```

---

### `TextareaBox`

A versatile textarea input component with customizable styles via variants, supporting controlled value and change handling. Includes default styling and optional props for flexibility.

#### Props

| Name          | Type                                | Default     | Description                                         |
| ------------- | ----------------------------------- | ----------- | --------------------------------------------------- |
| `id`          | `string`                            | —           | Optional id attribute for the textarea.             |
| `name`        | `string`                            | —           | Optional name attribute for the textarea.           |
| `value`       | `string`                            | —           | Controlled value of the textarea.                   |
| `onChange`    | `(value: string) => void`           | —           | Callback triggered when the textarea value changes. |
| `placeholder` | `string`                            | `""`        | Placeholder text shown when the textarea is empty.  |
| `rows`        | `number`                            | `4`         | Number of visible text lines in the textarea.       |
| `variant`     | `"default" \| "flat" \| "bordered"` | `"default"` | Visual style variant of the textarea.               |
| `className`   | `string`                            | `""`        | Additional CSS classes to apply to the textarea.    |

---

#### Behavior

* Controlled textarea component that calls `onChange` with the current value on input.
* Supports three variants for different border and background styles:

  * `default`: subtle border with neutral colors
  * `flat`: no border, minimal styling
  * `bordered`: thicker colored border emphasizing focus
* Rounded corners, no resize handle, and smooth color transitions.
* Scrollbar hidden on Firefox and IE/Edge via inline styles.
* Supports `id` and `name` for accessibility and form integration.

---

#### Usage Example

```tsx
import React, { useState } from "react";
import TextareaBox from "./TextareaBox";

const Example = () => {
  const [text, setText] = useState("");

  return (
    <TextareaBox
      value={text}
      onChange={setText}
      placeholder="Write your message here..."
      rows={6}
      variant="bordered"
      className="w-full max-w-lg"
    />
  );
};

export default Example;
```

---

### `Tooltip`

A lightweight tooltip component that displays helpful content on hover, with configurable position, shape, and optional dotted underline styling for the trigger element.

#### Props

| Name        | Type                                     | Default   | Description                                                                             |
| ----------- | ---------------------------------------- | --------- | --------------------------------------------------------------------------------------- |
| `content`   | `string`                                 | —         | The text content shown inside the tooltip bubble.                                       |
| `position`  | `"top" \| "bottom" \| "left" \| "right"` | `"top"`   | Position of the tooltip relative to the target element.                                 |
| `children`  | `React.ReactNode`                        | —         | The element that triggers the tooltip on hover.                                         |
| `dotted`    | `boolean`                                | `false`   | Whether to apply a dotted underline style on the trigger element to indicate help text. |
| `shape`     | `"round" \| "square"`                    | `"round"` | Shape of the tooltip bubble corners — rounded corners or square corners.                |
| `className` | `string`                                 | `""`      | Additional CSS classes to customize the tooltip bubble appearance.                      |

---

#### Behavior

* Shows a tooltip bubble with `content` text when the user hovers over the `children` element.
* Positions the tooltip above, below, left, or right of the target based on the `position` prop.
* Tooltip bubble smoothly fades in/out with opacity transition.
* Supports rounded (`round`) or sharp (`square`) corners on the tooltip bubble.
* Optionally applies a dotted underline style on the trigger text to visually indicate a tooltip (`dotted` prop).
* Tooltip is non-interactive (pointer events disabled) to prevent blocking underlying elements.
* The trigger container uses `inline-block` and `relative` positioning for correct tooltip placement.

---

#### Usage Example

```tsx
import React from "react";
import Tooltip from "./Tooltip";

const Example = () => (
  <div className="p-8">
    <Tooltip content="This is a helpful tooltip" position="right" dotted>
      <span className="text-blue-600">Hover me</span>
    </Tooltip>

    <Tooltip content="Square tooltip here" position="bottom" shape="square" className="bg-red-600">
      <button className="ml-6 px-3 py-1 border rounded">Click me</button>
    </Tooltip>
  </div>
);

export default Example;
```

---


## 5. Axios Instance Configuration Documentation

This file creates a customized Axios HTTP client instance used throughout the React app to interact with APIs.

---

### File Location

`src/api/axiosInstance.ts` (or similar path)

---

### Purpose

* Centralizes API base URL configuration.
* Automatically attaches authentication tokens to every request.
* Handles common HTTP response errors globally (e.g., unauthorized access).
* Sets default headers like Content-Type.

---

### Code Breakdown

#### 1. Base URL Configuration

```ts
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.example.com";
```

* Reads API base URL from environment variable `VITE_API_URL`.
* Falls back to a default URL if env var is missing.
* Keeps API endpoint flexible between dev, staging, and production.

#### 2. Create Axios Instance

```ts
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
```

* Uses `axios.create()` to instantiate an Axios client with common config.
* All requests use the specified base URL.
* Sets default `Content-Type` to JSON for POST/PUT requests.

#### 3. Request Interceptor — Attach Token

```ts
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

* Before every request, this interceptor runs.
* Checks for a saved `accessToken` in `localStorage`.
* If token exists, adds it to the request headers as `Authorization: Bearer <token>`.
* Ensures all API calls are authenticated if token is available.

#### 4. Response Interceptor — Handle Errors Globally

```ts
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized, logging out...");
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

* Intercepts every API response.
* If the server returns a 401 Unauthorized error:

  * Logs out the user by removing the token from `localStorage`.
  * Redirects user to the `/login` page for re-authentication.
* Propagates other errors for individual components to handle as needed.

#### 5. Export Default

```ts
export default axiosInstance;
```

* Exports this configured Axios instance to be imported and used in API services.

---

### Usage Example

```ts
import axiosInstance from './utils/axiosInstance';

const getUserProfile = async () => {
  const response = await axiosInstance.get('/user/profile');
  return response.data;
};
```

* All API calls automatically use base URL and attach token.
* Errors like 401 are handled globally, simplifying component-level code.

---

### Notes for Developers

* Make sure the `accessToken` is properly stored in `localStorage` upon login.
* Customize `API_BASE_URL` via `.env` files for different environments.
* For handling other HTTP status codes globally, extend the response interceptor.
* To add other headers or interceptors (e.g., refresh tokens), update this file accordingly.
* Use this single instance across your React app for consistency.

---

## 6. **State Management**

### Overview

Manages **production floor** data in a Redux store using **Redux Toolkit**. It provides:

* Async thunks to **fetch**, **create**, **update**, **delete** production floor data.
* Offline caching via IndexedDB (idb) for floors.
* Pagination support for listing floors.
* Filtering floors by section.
* Local state for loading, error handling, and messages.

---

### Store Configuration (`src/app/store.ts`)

* Uses `configureStore` from Redux Toolkit.
* Registers reducers for multiple modules including `productionFloor`.
* Applies custom middleware `loadingMiddleware` alongside default middleware.
* Exports typed hooks for dispatch (`useAppDispatch`) and inferred `RootState` and `AppDispatch` types.

```ts
const store = configureStore({
  reducer: {
    app: appReducer,
    dropdown: dropdownReducer,
    productionFloor: productionFloorReducer,
    // ... other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingMiddleware),
});
```

---

## Production Floor Slice (`productionFloorSlice.ts`)

### Initial State

* `floors`: Array of production floors.
* `filteredFloor`: Array filtered by section.
* `floor`: Single floor details (for forms, editing).
* `paginationObject`: Pagination info for listing.
* `loading`: Boolean loading state.
* `error`: Error message or null.
* `status`: Generic status string.
* `message`: String for success/info messages.

### Async Thunks

| Thunk Name             | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| `fetchPaginatedFloors` | Fetch paginated floor list from API                 |
| `fetchAllFloors`       | Fetch all floors, using IndexedDB cache or API      |
| `fetchAllFloorsJson`   | Fetch all floors from local JSON or IndexedDB cache |
| `filterFloorBySection` | Filter floors by section id from IndexedDB          |
| `fetchFloor`           | Fetch single floor by id                            |
| `createFloor`          | Create a new floor via POST API                     |
| `updateFloor`          | Update existing floor via PUT API                   |
| `deleteFloor`          | Delete floor by id via DELETE API                   |

* Error handling uses `rejectWithValue` with error messages for easy UI feedback.

### Reducers

* `resetForm`: Reset state to initial.
* `resetMessage`: Clear `message`.
* `resetError`: Clear `error`.

### Extra Reducers

Handles async thunk lifecycles:

* On pending, sets `loading = true`.
* On fulfilled, updates state with response data, sets `loading = false`.
* On rejected, sets `error` message and `loading = false`.

Example snippet:

```ts
builder
  .addCase(fetchPaginatedFloors.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchPaginatedFloors.fulfilled, (state, action) => {
    state.paginationObject = action.payload;
    state.loading = false;
  })
  .addCase(fetchPaginatedFloors.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
```

---

## Usage Example in React Components

```tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchPaginatedFloors } from '../reduxSlices/productionFloorSlice';
import { useAppDispatch, RootState } from '../../../app/store';

const ProductionFloorList = () => {
  const dispatch = useAppDispatch();
  const { paginationObject, loading, error } = useSelector(
    (state: RootState) => state.productionFloor
  );

  useEffect(() => {
    dispatch(fetchPaginatedFloors({ page: 1, perPage: 10 }));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {paginationObject.data.map((floor) => (
        <li key={floor.id}>{floor.floorName}</li>
      ))}
    </ul>
  );
};
```

---

## IndexedDB Integration

* Before fetching from API, checks local IndexedDB cache.
* Saves fetched data to IndexedDB for offline access.
* Provides fast local filtering without network requests.

---

## Error Handling

* All async thunks catch errors and return readable messages.
* UI can respond to error state from Redux slice for user feedback.

---

## Summary

* Robust Redux Toolkit slice for managing production floors.
* Supports async CRUD operations with API and IndexedDB caching.
* Fully typed with TypeScript.
* Middleware support for loading indicators.
* Easily extensible with more reducers or thunks.

---

## 6. **API Integration**

```md
# API Integration

APIs are defined inside `modules/[feature]/services/api.ts`.

Example:
```ts
export const fetchTnaTasks = () => axios.get('/api/tna-tasks');
````

---

Here's a **modern, structured, and developer-friendly `Code Style Guide`** section tailored for your React + Redux Toolkit + TypeScript project — including naming conventions used in your `TnaTaskManager` component:

---

## 10. **Code Style Guide**

This project follows consistent conventions to ensure maintainability, readability, and collaboration across teams.

---

## 🔤 Language

- ✅ **Use TypeScript** — strictly typed across all layers (state, components, utils).
- ✅ All interfaces/types go inside a `.interface.ts` or `.types.ts` file.

---

## 🗂 Folder & File Naming

| Element                 | Style         | Example                     |
|-------------------------|---------------|-----------------------------|
| Folders                 | `camelCase`   | `tnaTaskSlice/`, `utils/`   |
| Files (Component)       | `PascalCase`  | `TnaTaskForm.tsx`           |
| Files (Slice/Service)   | `camelCase`   | `tnaTaskSlice.ts`           |
| Interfaces/Types File   | `camelCase`   | `tnaTaskType.interface.ts`  |
| Constants File          | `UPPER_SNAKE` | `APP_CONSTANTS.ts`          |

---

## 🔧 Component Structure

- ✅ One React component per file.
- ✅ Component names use `PascalCase`.
- ✅ Group similar logic inside `modules/[feature]/components`, `reduxSlices`, or `services`.

---

## 🔁 Function Naming

| Type               | Style         | Example                    |
|--------------------|---------------|----------------------------|
| Component Function | `PascalCase`  | `TnaTaskManager()`         |
| Event Handler      | `camelCase`   | `handleEditRow()`, `addTask()` |
| Redux Thunks       | `camelCase`   | `fetchAllTnaTaskGroupsJson()` |
| Utility Function   | `camelCase`   | `calculateLeadTime()`      |

- Prefix handlers with `handle` and thunks with `fetch`, `create`, `update`, `delete`.

---

## 🧠 React Hooks Best Practices

- ✅ Wrap callbacks with `useCallback()` when passing to child components.
- ✅ Memoize expensive computed values using `useMemo()` if needed.
- ✅ Always manage side-effects via `useEffect()` cleanly.
- ❗Avoid deeply nested logic in JSX. Extract into helper functions or hooks.

---

## 🧱 Redux Toolkit Guidelines

- ✅ Slices follow `featureNameSlice.ts` convention.
- ✅ State slices use `camelCase`: `tnaTaskGroup`, `tnaTeam`, `tnaTask`.
- ✅ Selectors access nested state properly via `useSelector((state: RootState) => state.feature)`.

const { tnaTaskTypes } = useSelector((state: RootState) => state.tnaTask);

* ✅ Use `createAsyncThunk` for async actions and handle lifecycle (pending, fulfilled, rejected).
* ✅ Group async logic in `reduxSlices`, API logic in `services`.

---

## 📐 ESLint & Prettier

* Code formatting is enforced via `.eslintrc` and `.prettierrc`.
* Use `"type": "module"` in `tsconfig.json` for modern module resolution.
* Run formatting with:

```bash
npm run lint
npm run format
```

---

## 🧪 Naming in Practice (TnaTaskManager.tsx)

| Element                  | Naming Style | Example                                |
| ------------------------ | ------------ | -------------------------------------- |
| Component Name           | `PascalCase` | `TnaTaskManager`                       |
| State Variables          | `camelCase`  | `editRowIndex`, `isUpdateMode`         |
| Redux Slice State        | `camelCase`  | `tnaTaskGroups`, `planWorkingTeams`    |
| Event Handlers           | `camelCase`  | `handleDeleteRow()`, `handleEditRow()` |
| Dispatch Imports         | `PascalCase` | `AppDispatch`                          |
| Custom Component Imports | `PascalCase` | `CustomDataTable`, `DropdownButton`    |
| Action Creators (Async)  | `camelCase`  | `fetchAllTnaTaskGroupsJson()`          |
| Utility Function         | `camelCase`  | `saveTnaTaskTypeToIndexDB()`           |

---

## ✅ Summary

* Keep all logic **modular**, **typed**, and **cleanly separated** by concern.
* Follow **consistent casing**: `camelCase`, `PascalCase`, `UPPER_SNAKE_CASE`.
* Ensure **predictable Redux state shape** and minimal prop drilling.
* Reuse and abstract components early.


---

Here’s a clean, modern, and developer-friendly documentation section for **Environment Variables** in your React + TypeScript project:

---

## 7. **Environment Variables**

````md
# 🌍 Environment Variables

Environment variables are used to configure API endpoints, WebSocket URLs, and other environment-specific values **without hardcoding** them in the codebase.

These are stored in the `.env` file at the root of the project.

---

## 📁 File: `.env`

```env
REACT_APP_API_BASE_URL=https://api.example.com
REACT_APP_SOCKET_URL=wss://ws.example.com
````

> 🔒 **Note**: All environment variable names **must start with `REACT_APP_`** in Create React App projects to be available at runtime.

---

## 🌐 Usage in Code

```ts
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const socketUrl = process.env.REACT_APP_SOCKET_URL;
```

These can then be passed to `axios.create`, WebSocket clients, or other services.

---

## 📦 Common Examples

| Variable Name              | Purpose                                   |
| -------------------------- | ----------------------------------------- |
| `REACT_APP_API_BASE_URL`   | Base URL for all API requests (REST)      |
| `REACT_APP_SOCKET_URL`     | WebSocket endpoint for real-time features |
| `REACT_APP_BUILD_ENV`      | Custom flag to distinguish environments   |
| `REACT_APP_FEATURE_FLAG_X` | Toggle experimental features if needed    |

---

## 🛡️ Best Practices

* ✅ Never commit `.env` files containing secrets to version control.
* ✅ Use `.env.development`, `.env.production`, `.env.local` to handle different environments.
* ✅ Document the required `.env` variables in `README.md` or `env.example`.

---

## 📄 Recommended `.env.example`

```env
REACT_APP_API_BASE_URL=
REACT_APP_SOCKET_URL=
```

---


## 8. **Deployment Guide**

````md
# Deployment

```bash
npm run build
serve -s build
````

---
