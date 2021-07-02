import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="wrapper">
      <div className="content">
        <Component {...pageProps} />
      </div>
      <footer>
        made with ❤️ and ☕️ by <a href="https://twitter.com/NickOelsner">nick oelsner</a>
      </footer>
    </div>
  );
}
