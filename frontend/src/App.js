import { useState } from "react";
import "./App.css";
import FriendCard from "./components/friend-card";
import SendCryptoForm from "./components/send-crypto-form";
import Data from "./data/data.json";

function App() {
  const [current_tab, setCurrentTab] = useState("friend_list"); // friend_list, pending_requests
  const [form_data, setFormData] = useState(null);

  const handleSendCrypto = (name, profile_img) => {
    setFormData((prev) => {
      return { ...prev, name, profile_img };
    });
  };

  return (
    <div className="bg-[#121319] min-h-screen">
      <div className="w-full h-screen grid place-items-center">
        <div className="h-96">
          {/* Tabs to see pending requests */}
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentTab("friend_list")}
              className="px-4 text-white py-6 flex justify-center items-center"
            >
              Friend List
            </button>
            <button
              onClick={() => setCurrentTab("pending_request")}
              className="px-4 text-white py-6 flex justify-center items-center "
            >
              Pending Requests
            </button>
            <button
              onClick={() => setCurrentTab("find_friends")}
              className="px-4 text-white py-6 flex justify-center items-center "
            >
              Find Friends
            </button>
          </div>
          {current_tab === "friend_list" ? (
            <div className="flex flex-col gap-4">
              {Data?.contacts?.map((item, index) =>
                item?.is_friend ? (
                  <FriendCard
                    profile_img={item?.profile_img}
                    name={item?.name}
                    email={item?.email}
                    is_friend={item?.is_friend}
                    handleSendCrypto={handleSendCrypto}
                  />
                ) : null
              )}
            </div>
          ) : current_tab === "find_friends" ? (
            <div className="flex flex-col gap-4">
              {Data?.contacts?.map((item, index) =>
                !item?.is_friend ? (
                  <FriendCard
                    profile_img={item?.profile_img}
                    name={item?.name}
                    email={item?.email}
                    is_friend={item?.is_friend}
                    handleSendCrypto={handleSendCrypto}
                  />
                ) : null
              )}
            </div>
          ) : null}

          {/* Form Data to send cryptos */}
          {form_data !== null && (
            <SendCryptoForm
              receiver_name={form_data?.name}
              receiver_img={form_data?.profile_img}
              coin_icon="https://files.coinswitch.co/public/coins/btc.png"
              coin_name="Bitcoin"
              coin_symbol="BTC"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
