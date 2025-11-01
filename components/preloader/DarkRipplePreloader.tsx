export default function DarkRipplePreloader() {
  return (
    <div id="pre-load" className="loader" aria-hidden="true" role="presentation" data-loading-overlay>
      <div className="loader-inner">
        <div className="loader-logo" aria-hidden="true">
          <img src="/logo.svg" alt="" width="60" height="60" />
        </div>
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
      </div>
    </div>
  );
}
