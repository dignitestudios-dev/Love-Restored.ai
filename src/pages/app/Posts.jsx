import { useState, useEffect } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import { useFetchData } from "../../hooks/api/Get";
import { dummyImg } from "../../assets/export";
import Pagination from "./Pagination";
import PostsSkeleton from "../../components/Loaders/PostsSkeleton";
import { useNavigate } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerField from "../../components/DatePickerField";
import moment from "moment";

const Posts = () => {
  const [menuOpenId, setMenuOpenId] = useState(null);
  console.log("🚀 ~ Posts ~ menuOpenId:", menuOpenId);
  // const [modal, setModal] = useState({ type: null, postId: null });
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [page, setPage] = useState(1);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const {
    data: postsData,
    loading,
    pagination,
  } = useFetchData(
    `/admin/posts`,
    9,
    {
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : "",
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
    },
    page,
    false
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest("[data-menu-toggle]")) {
        setMenuOpenId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // const openMenu = (id) => {
  //   setMenuOpenId(menuOpenId === id ? null : id);
  // };

  // const openModal = (type, postId) => {
  //   setModal({ type, postId });
  //   setMenuOpenId(null);
  // };

  // const closeModal = () => {
  //   setModal({ type: null, postId: null });
  // };

  // const handleDelete = () => {
  //   setPosts(posts.filter((post) => post.id !== modal.postId));
  //   closeModal();
  // };

  // const handleEdit = () => {
  //   alert(`Edit post ${modal.postId}`);
  //   closeModal();
  // };

  return (
    <div className="p-6 text-white min-h-screen pt-0">
      <div className="background-gradients relative p-6 rounded-xl text-white shadow-md border-2 border-gray-700 overflow-hidden mt-4">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

        {/* Title + Icon */}
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">
            Community Management
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 items-center justify-end">
        <DatePickerField
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
        />
        <DatePickerField
          label="End Date"
          value={endDate}
          onChange={setEndDate}
          minDate={startDate}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <PostsSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {postsData?.posts?.map((post) => (
            <div
              key={post?._id}
              className="background-gradient cursor-pointer rounded-2xl overflow-hidden shadow-lg border border-gray-800 hover:border-[#DAB462] transition-all relative"
              // onClick={() => openModal("view", post?._id)} // Open view modal on click
              onClick={() => navigate(`/app/post-details/${post?._id}`)}
            >
              {/* User Info */}
              <div className="flex items-center justify-between px-4 pt-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={post?.user?.profilePicture}
                    alt={post.user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="font-semibold">{post?.user?.name}</p>
                </div>

                {/* 3 dots menu */}
                <div className="relative">
                  {/* <button
                  data-menu-toggle
                  onClick={() => openMenu(post.id)}
                  className="p-2 rounded-full hover:bg-[#DAB462]/20 transition"
                  title="Options"
                >
                  <FaEllipsisV className="text-white" />
                </button> */}

                  {/* Dropdown */}
                  {/* {menuOpenId === post.id && (
                  <div className="absolute right-0 mt-2 w-28 bg-[#1F2937]/90 border border-gray-700 rounded-lg shadow-lg z-50 backdrop-blur-md">
                    <button
                      data-menu-toggle
                      onClick={() => openModal("edit", post.id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm w-full text-white hover:bg-gray-700 rounded-t-lg"
                    >
                      Edit
                    </button>
                    <button
                      data-menu-toggle
                      onClick={() => openModal("delete", post.id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm w-full text-white hover:bg-gray-700 rounded-b-lg"
                    >
                      Delete
                    </button>
                  </div>
                )} */}
                </div>
              </div>

              {/* Image */}
              <div className="mt-3">
                <img
                  src={post?.media[0]?.thumbnail ?? dummyImg}
                  alt="Post"
                  className="w-full h-60 object-cover rounded-t-lg"
                />
              </div>

              {/* Description */}
              <div className="p-4">
                <p className="text-sm text-gray-300 mb-3">{post?.text}</p>

                {/* Likes & Comments */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <FaHeart className="text-red-500" />
                    <span>{post?.likeCount?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaComment className="text-gray-400" />
                    <span>{post?.commentCount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination
        currentPage={pagination?.currentPage}
        totalPages={pagination?.totalPages}
        onPageChange={handlePageChange}
        setCurrentPage={page}
      />

      {/* Modal */}
      {/* {modal.type && currentPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4">
          <div className="background-gradient border border-gray-700 rounded-xl max-w-md w-full p-6 shadow-lg text-white relative"> */}
      {/* <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition text-xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button> */}

      {/* {modal.type === "view" && (
              <>
                <h2 className="text-2xl font-semibold mb-4">Post Details</h2>


                <div className="mb-4">
                  <div className="flex items-center mb-4">
                    <img
                      src={currentPost.profile}
                      alt={currentPost.user}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <p className="text-lg font-semibold">{currentPost.user}</p>
                  </div>

                  
                  <img
                    src={currentPost.image}
                    alt="Post Image"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />

                  
                  <p className="text-sm text-gray-300 mb-4">
                    {currentPost.description}
                  </p>

                  
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <FaHeart className="text-red-500" />
                      <span>{currentPost.likes.toLocaleString()} Likes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaComment />
                      <span>{currentPost.comments} Comments</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => openModal("edit", currentPost.id)}
                    className="px-6 flex py-2  items-center rounded-xl border border-gray-700 hover:border-[#DAB462] transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openModal("delete", currentPost.id)}
                    className="px-6 flex items-center  py-2 rounded-xl  font-semibold border hover:border-[#DAB462] border-gray-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            )} */}

      {/* {modal.type === "edit" && (
              <>
                <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
                <p>Editing post ID: {modal.postId}</p>
                
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded-xl border border-gray-600 hover:border-[#DAB462] transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 rounded-xl button-bg text-black font-semibold hover:bg-[#b8860b] transition"
                  >
                    Save
                  </button>
                </div>
              </>
            )} */}

      {/* {modal.type === "delete" && (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-red-500">
                  Delete Post
                </h2>
                <p>Are you sure you want to delete this post?</p>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded-xl border border-gray-600 hover:border-red-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-xl bg-red-500 font-semibold hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            )} */}

      {/* </div>
        </div>
      )} */}
    </div>
  );
};

export default Posts;
