export default function Footer() {
  return (
    <footer className="border-t bg-white px-8 py-4">
      <div className="flex items-center justify-between text-sm text-gray-500">
        
        {/* Copyright */}
        <p>
          © {new Date().getFullYear()} VINEEV EDU. ALL RIGHTS RESERVED
        </p>

        {/* Footer Links */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="transition hover:text-blue-600"
          >
            Privacy Policy
          </a>

          <a
            href="#"
            className="transition hover:text-blue-600"
          >
            Terms of Service
          </a>

          <a
            href="#"
            className="transition hover:text-blue-600"
          >
            Support
          </a>
        </div>

      </div>
    </footer>
  );
}