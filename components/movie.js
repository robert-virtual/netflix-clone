export default function Movie({ movie: { url, caption } }) {
  return (
    <div>
      <img className="w-96" src={url} alt="" />
    </div>
  );
}
