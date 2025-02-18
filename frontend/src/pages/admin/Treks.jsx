import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, FormGroup, Label, Input } from "reactstrap";

const Treks = () => {
  const [treks, setTreks] = useState([]);
  const [newTrek, setNewTrek] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
  });
  const [editingTrek, setEditingTrek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTreks = async () => {
      try {
        const response = await axios.get("/api/v1/admin/treks", {
          withCredentials: true,
        });
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
      const response = await axios.post(
        "/api/v1/admin/treks",
        newTrek,
        {
          withCredentials: true,
        }
      );
      setTreks([...treks, response.data.data]);
      setNewTrek({ name: "", description: "", location: "", price: "" });
    } catch (err) {
      setError("Failed to add trek");
    }
  };

  const handleDeleteTrek = async (trekId) => {
    try {
      await axios.delete(`/api/v1/admin/treks/${trekId}`, {
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
        `/api/v1/admin/treks/${editingTrek._id}`,
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
      setNewTrek({ name: "", description: "", location: "", price: "" });
    } catch (err) {
      setError("Failed to update trek");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Manage Treks</h1>
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={newTrek.name}
            onChange={(e) => setNewTrek({ ...newTrek, name: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="text"
            id="description"
            value={newTrek.description}
            onChange={(e) =>
              setNewTrek({ ...newTrek, description: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input
            type="text"
            id="location"
            value={newTrek.location}
            onChange={(e) =>
              setNewTrek({ ...newTrek, location: e.target.value })
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
        <Button onClick={editingTrek ? handleUpdateTrek : handleAddTrek}>
          {editingTrek ? "Update Trek" : "Add Trek"}
        </Button>
      </Form>

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {treks.map((trek) => (
            <tr key={trek._id}>
              <td>{trek.name}</td>
              <td>{trek.description}</td>
              <td>{trek.location}</td>
              <td>{trek.price}</td>
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
