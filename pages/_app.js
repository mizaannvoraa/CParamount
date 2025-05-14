// pages/_app.js
import 'animate.css';
import '@/styles/globals.css'; // your global styles if any

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
