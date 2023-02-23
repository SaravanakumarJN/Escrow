import { memo } from "react";

function FriendCard({ profile_img, name, email, is_friend, handleSendCrypto }) {
  return (
    <div className="flex items-center w-[500px] gap-4">
      <div className="rounded">
        <img
          src={profile_img}
          width="50px"
          height="50px"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-white font-bold">{name}</span>
        <span className="text-white">{email}</span>
      </div>
      {!is_friend && (
        <button className=" bg-[#4E53D0] text-white p-2 rounded-lg">
          Add Friend
        </button>
      )}
      {is_friend && (
        <button
          onClick={() => {
            handleSendCrypto(name, profile_img);
          }}
          className="bg-[#4E53D0] text-white p-2 rounded-lg"
        >
          Send Cryptos
        </button>
      )}
    </div>
  );
}

export default memo(FriendCard);
