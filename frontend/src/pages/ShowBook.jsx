import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/spinner";
const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        console.log(id);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-4">
      <BackButton />

      <h1 className="text-3xl my-3">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-600 w-fit rounded-xl p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-200">Id :</span>
            <span className="text-xl mr-4 text-gray-200">{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-200">Author :</span>
            <span className="text-xl mr-4 text-gray-200">{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-200">Published Year :</span>
            <span className="text-xl mr-4 text-gray-200">
              {book.publishedyear}
            </span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-200">Updated At :</span>
            <span className="text-xl mr-4 text-gray-200">{book.updatedAt}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
