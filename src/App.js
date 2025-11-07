import { useState } from "react";
import "./App.css";

const initialFriends = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    balance: -7,
    image: "https://i.pravatar.cc/48?u=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    balance: 500,
    image: "https://i.pravatar.cc/48?u=2",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    balance: 1000,
    image: "https://i.pravatar.cc/48?u=3",
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  // add this new state (replace your initialFriends variable in FriendsList)
const [friends, setFriends] = useState(initialFriends);

  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((cur) => !cur);
  }
  function handleAddFriend(newFriend) {
  setFriends((friends) => [...friends, newFriend]);
  setShowAddFriend(false);
}


  return (
    <div className="app">
      <div className="sidebar">
        {/* <FriendsList />

        // {showAddFriend && <FormAddFriend />} */}
        <FriendsList friends={friends} />
{showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}


        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

export default App;

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <li key={friend.id}>
          <img src={friend.image} alt={friend.name} />
          <h3>{friend.name}</h3>

          {friend.balance < 0 && (
            <p className="red">
              You owe {friend.name} {Math.abs(friend.balance)}
            </p>
          )}

          {friend.balance > 0 && (
            <p className="green">
              {friend.name} owes you {friend.balance}
            </p>
          )}

          {friend.balance === 0 && (
            <p>You and {friend.name} are even</p>
          )}

          <button className="button">Select</button>
        </li>
      ))}
    </ul>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=1");

  function handleSubmit(e) {
  e.preventDefault();
  if (!name || !image) return;

  const newFriend = {
    id: crypto.randomUUID(),
    name,
    image,
    balance: 0,
  };

  onAddFriend(newFriend);
  setName("");
  setImage("https://i.pravatar.cc/48?u=1");
}


  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧍‍♂️ Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with x</h2>

      <label>💰 Bill value</label>
      <input type="number" />

      <label>🧍‍♂️ Your expense</label>
      <input type="text" />

      <label>🧍‍♀️ x's expense</label>
      <input type="text" disabled />

      <label>😊 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">x</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
