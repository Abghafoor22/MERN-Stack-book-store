import axios from "axios";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        console.log(response.data);
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-4xl text-sky-400 " />
        </Link>
      </div>

      <div>
        {loading ? (
          <Spinner />
        ) : (
          <table className="w-full border border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-600 rounded-md">No</th>
                <th className="border border-slate-600 rounded-md">Title</th>
                <th className="border border-slate-600 rounded-md max-md:hidden">
                  Author
                </th>
                <th className="border border-slate-600 rounded-md max-md:hidden">
                  Published Year
                </th>
                <th className="border border-slate-600 rounded-md">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id} className="h-8">
                  <td className="border border-slate-800 rounded-md text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-800 rounded-md text-center">
                    {book.title}
                  </td>
                  <td className="border border-slate-800 rounded-md text-center max-md:hidden">
                    {book.author}
                  </td>
                  <td className="border border-slate-800 rounded-md text-center max-md:hidden">
                    {book.publishedyear}
                  </td>
                  <td className="border border-slate-800 rounded-md text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/books/details/${book._id}`}>
                        <acronym title="Details">
                          <BsInfoCircle className="text-2xl text-green-400 " />
                        </acronym>
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <acronym title="Edit">
                          <CiEdit className="text-2xl text-yellow-400" />
                        </acronym>
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <MdDelete className="text-2xl text-red-700 " />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
