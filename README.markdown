# EasyFrontend CLI 🚀

**EasyFrontend** is a powerful and intuitive CLI tool that simplifies the process of setting up modern frontend projects. With a single command, generate a fully configured **React** project using **Vite**, pre-loaded with **Tailwind CSS**, **React Router**, **Redux Toolkit**, and more. Say goodbye to repetitive boilerplate setup and hello to rapid development! 🎉

---

## ✨ Features

- **Instant Project Setup**: Create a production-ready React project with Vite in seconds.
- **Pre-Configured Stack**:
  - Tailwind CSS for styling.
  - React Router for navigation.
  - Redux Toolkit for state management.
  - Axios for API calls.
  - Lucide React for icons.
  - Google OAuth for authentication.
- **Modern Folder Structure**: Organized components, services, and utilities.
- **Customizable**: Easily extend or modify the generated project to fit your needs.
- **Developer-Friendly**: Modular codebase with clear documentation.

---

## 🛠️ Installation

Get started with **EasyFrontend** in just a few steps:

1. **Install globally via npm**:

   ```bash
   npm install -g easyfrontend
   ```

2. **Run the CLI**:

   ```bash
   easyfrontend
   ```

Alternatively, use `npx` to run without installing globally:

```bash
npx easyfrontend
```

---

## 🚀 Usage

Run the `easyfrontend` command and follow the interactive prompts to configure your project:

```bash
easyfrontend
```

### Example Prompts

```
? Select a framework: React
? Select a language: JavaScript
? Enter project name: my-awesome-app
```

This will:

- Create a new Vite-based React project named `my-awesome-app`.
- Set up a `Frontend` folder with a pre-configured structure.
- Install dependencies like Tailwind CSS, React Router, and Redux Toolkit.
- Generate essential files (e.g., `RoutesConfig.jsx`, `DashboardSlice.js`).
- Start the development server automatically.

### Generated Project Structure

```
Frontend/
├── src/
│   ├── app/
│   │   ├── DashboardSlice.js
│   │   └── store.js
│   ├── components/
│   │   ├── common/
│   │   ├── protected/
│   │   ├── utils/
│   │   └── data/
│   ├── services/
│   │   ├── repository/
│   │   ├── Apis.js
│   │   └── Connector.js
│   ├── index.css
│   ├── App.jsx
│   ├── main.jsx
│   └── RoutesConfig.jsx
├── .env
├── vite.config.js
└── package.json
```

---

## 📋 Prerequisites

- **Node.js**: Version 16.x or higher.
- **npm**: Version 8.x or higher.
- A valid **Google Client ID** for OAuth integration (add to `.env`).

---

## ⚙️ Configuration

The generated project includes a `.env` file for environment variables. Update it with your API base URL and Google Client ID:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_PUBLIC_GOOGLE_CLIENT=your-google-client-id
```

> **Note**: Keep the `.env` file secure and never commit it to version control.

---

## 🧑‍💻 Contributing

We welcome contributions to make **EasyFrontend** even better! Here's how to get started:

1. **Fork the repository**.

2. **Clone your fork**:

   ```bash
   git clone https://github.com/Haresh-729/easyFrontend
   ```

3. **Install dependencies**:

   ```bash
   cd easyfrontend
   npm install
   ```

4. **Create a new branch**:

   ```bash
   git checkout -b feature/your-feature
   ```

5. **Make your changes** and commit:

   ```bash
   git commit -m "Add your feature"
   ```

6. **Push to your fork**:

   ```bash
   git push origin feature/your-feature
   ```

7. **Open a Pull Request** on GitHub.

Please read our Contributing Guidelines for more details.

---

## 🐛 Reporting Issues

Found a bug? Have a feature request? Open an issue on our GitHub Issues page.

---

## 📜 License

<p className="text-sm text-gray-600 flex items-center gap-2 flex-wrap">
              <a
                href="https://easyfrontend.vercel.app/"
                className="text-blue-600 hover:underline"
              >
                EasyFrontend CLI
              </a>
              by
              <a
                href="https://hareshkurade.netlify.app"
                className="text-blue-600 hover:underline"
              >
                Haresh Kurade
              </a>
              is licensed under
              <a
                href="https://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1"
                target="_blank"
                rel="license noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                CC BY-NC 4.0
                <img
                  src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
                  alt="Creative Commons"
                  style="width: 15px;"
                />
                <img
                  src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
                  alt="Attribution"
                  style="width: 15px;"
                />
                <img
                  src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
                  alt="NonCommercial"
                  style="width: 15px;"
                />
              </a>
            </p>

---

## 🌟 Acknowledgements

- Built with ❤️ by Haresh Kurade.
- Inspired by modern frontend development workflows.
- Thanks to the open-source community for tools like Vite, React, and Tailwind CSS.

---

## 📬 Contact

Have questions or feedback? Reach out to us:

- **Email**: kuradeharesh4002@gmail.com
- **GitHub**: haresh-729

---

**Start building your next frontend project with ease!** 🚀
