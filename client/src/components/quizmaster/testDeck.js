import "antd/dist/antd.css";
import "./testDeck.css";
import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function TestDeck() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingDeck, setEditingDeck] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      title: "Deck 1",
      category: "Category A",
      description: "Deck 1",
    },
    {
      id: 1,
      title: "Deck 2",
      category: "Category B",
      description: "Deck 2",
    },
    {
      id: 1,
      title: "Deck 3",
      category: "Category C",
      description: "Deck 3",
    },

  ]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "3",
      title: "Category",
      dataIndex: "category",
    },
    {
      key: "4",
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditDeck(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteDeck(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddDeck = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newDeck = {
      id: randomNumber,
      title: "Title " + randomNumber,
      category: randomNumber + "Category",
      description: "Description " + randomNumber,
    };
    setDataSource((pre) => {
      return [...pre, newDeck];
    });
  };
  const onDeleteDeck = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this deck record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((deck) => deck.id !== record.id);
        });
      },
    });
  };
  const onEditDeck = (record) => {
    setIsEditing(true);
    setEditingDeck({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingDeck(null);
  };
  return (
    <div className="Deck">
      <header className="Deck-header">
        <Button onClick={onAddDeck}>Add a new Deck</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Deck"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((deck) => {
                if (deck.id === editingDeck.id) {
                  return editingDeck;
                } else {
                  return deck;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingDeck?.title}
            onChange={(e) => {
              setEditingDeck((pre) => {
                return { ...pre, title: e.target.value };
              });
            }}
          />
          <Input
            value={editingDeck?.category}
            onChange={(e) => {
              setEditingDeck((pre) => {
                return { ...pre, category: e.target.value };
              });
            }}
          />
          <Input
            value={editingDeck?.description}
            onChange={(e) => {
              setEditingDeck((pre) => {
                return { ...pre, description: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default TestDeck;