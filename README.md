# BookMouse

A minimal Node.js application for validating ISBN numbers.

## Description

BookMouse is a tiny command-line utility that validates both ISBN-10 and ISBN-13 numbers according to their respective checksum algorithms.

## Installation

```bash
git clone <repository-url>
cd book-mouse
npm install
```

## Usage

Run the application by passing an ISBN number as a command-line argument:

```bash
node bookMouse.js 978-3-16-148410-0
```

Or if you want to make it executable:

```bash
chmod +x bookMouse.js
./bookMouse.js 0-306-40615-2
```

The application automatically handles both ISBN-10 and ISBN-13 formats and ignores hyphens and spaces in the input.

## Valid ISBN Examples

- ISBN-10: 0-306-40615-2
- ISBN-13: 978-3-16-148410-0

## License

MIT