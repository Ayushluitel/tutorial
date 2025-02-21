import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, FormGroup, Label, Input } from "reactstrap";

const Treks = () => {
  const [treks, setTreks] = useState([]);
  const [newTrek, setNewTrek] = useState({
    title: "",
    desc: "",
    address: "",
    price: "",
    altitude: "",
    photo: [],
    time: "",
    difficulty: "",
    maxGroupSize: "",
    featured: false,
  });

  const [editingTrek, setEditingTrek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTreks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/admin/treks",
          {
            withCredentials: true,
          }
        );
        setTreks(response.data.data);
      } catch (err) {
        setError("Failed to fetch treks");
      } finally {
        setLoading(false);
      }
    };

    fetchTreks();
  }, []);

  const handleAddTrek = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newTrek.title);
      formData.append("desc", newTrek.desc);
      formData.append("address", newTrek.address);
      formData.append("price", newTrek.price);
      formData.append("altitude", newTrek.altitude);
      formData.append("time", newTrek.time);
      formData.append("difficulty", newTrek.difficulty);
      formData.append("maxGroupSize", newTrek.maxGroupSize);
      formData.append("featured", newTrek.featured);

      for (let i = 0; i < newTrek.photo.length; i++) {
        formData.append("photo", newTrek.photo[i]);
      }

      const response = await axios.post(
        "http://localhost:4000/api/v1/admin/treks",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Tour created successfully:", response.data);

      // Clear form fields
      setNewTrek({
        title: "",
        desc: "",
        address: "",
        price: "",
        altitude: "",
        photo: [],
        time: "",
        difficulty: "",
        maxGroupSize: "",
        featured: false,
      });

      // Update the treks list
      setTreks([response.data.data, ...treks]);
    } catch (err) {
      console.error("Error adding trek:", err);
    }
  };

  const handleDeleteTrek = async (trekId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/admin/treks/${trekId}`, {
        withCredentials: true,
      });
      setTreks(treks.filter((trek) => trek._id !== trekId));
    } catch (err) {
      setError("Failed to delete trek");
    }
  };

  const handleEditTrek = (trek) => {
    setEditingTrek(trek);
    setNewTrek(trek);
  };

  const handleUpdateTrek = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/admin/treks/${editingTrek._id}`,
        newTrek,
        {
          withCredentials: true,
        }
      );
      const updatedTreks = treks.map((trek) =>
        trek._id === response.data.data._id ? response.data.data : trek
      );
      setTreks(updatedTreks);
      setEditingTrek(null);
      setNewTrek({ title: "", desc: "", address: "", price: "" });
    } catch (err) {
      setError("Failed to update trek");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Manage Treks</h1>
      <Form>
        <FormGroup>
          <Label for="title">Name</Label>
          <Input
            type="text"
            id="title"
            value={newTrek.title}
            onChange={(e) => setNewTrek({ ...newTrek, title: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Label for="desc">Description</Label>
          <Input
            type="text"
            id="desc"
            value={newTrek.desc}
            onChange={(e) => setNewTrek({ ...newTrek, desc: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Label for="address">Location</Label>
          <Input
            type="text"
            id="address"
            value={newTrek.address}
            onChange={(e) =>
              setNewTrek({ ...newTrek, address: e.target.value })
            }
          />
        </FormGroup>

        <FormGroup>
          <Label for="price">Price</Label>
          <Input
            type="number"
            id="price"
            value={newTrek.price}
            onChange={(e) => setNewTrek({ ...newTrek, price: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Label for="altitude">Altitude</Label>
          <Input
            type="number"
            id="altitude"
            value={newTrek.altitude}
            onChange={(e) =>
              setNewTrek({ ...newTrek, altitude: e.target.value })
            }
          />
        </FormGroup>

        <FormGroup>
          <Label for="time">Time</Label>
          <Input
            type="number"
            id="time"
            value={newTrek.time}
            onChange={(e) => setNewTrek({ ...newTrek, time: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Label for="difficulty">Difficulty</Label>
          <Input
            type="select"
            id="difficulty"
            value={newTrek.difficulty}
            onChange={(e) =>
              setNewTrek({ ...newTrek, difficulty: e.target.value })
            }
          >
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="difficult">Difficult</option>
            <option value="demanding">Demanding</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="maxGroupSize">Max Group Size</Label>
          <Input
            type="number"
            id="maxGroupSize"
            value={newTrek.maxGroupSize}
            onChange={(e) =>
              setNewTrek({ ...newTrek, maxGroupSize: e.target.value })
            }
          />
        </FormGroup>

        <FormGroup>
          <Label for="photo">Photos</Label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            multiple
            onChange={(e) => {
              setNewTrek({
                ...newTrek,
                photo: Array.from(e.target.files),
              });
            }}
          />
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              id="featured"
              checked={newTrek.featured}
              onChange={(e) =>
                setNewTrek({ ...newTrek, featured: e.target.checked })
              }
            />
            Featured
          </Label>
        </FormGroup>

        {/* Submit Button */}
        <Button onClick={editingTrek ? handleUpdateTrek : handleAddTrek}>
          {editingTrek ? "Update Trek" : "Add Trek"}
        </Button>
      </Form>

      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Address</th>
            <th>Price</th>
            <th>Difficulty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {treks.map((trek) => (
            <tr key={trek._id}>
              <td>{trek.title}</td>
              <td>{trek.desc}</td>
              <td>{trek.address}</td>
              <td>{trek.price}</td>
              <td>{trek.difficulty}</td>
              <td>
                <Button color="warning" onClick={() => handleEditTrek(trek)}>
                  Edit
                </Button>
                <Button
                  color="danger"
                  onClick={() => handleDeleteTrek(trek._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Treks;
