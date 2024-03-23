const DescriptionBox = (description: string, setDescription: (description: string) => void) => {
  return (
    <div className="description-box">
      <label>Description</label>
      <textarea
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};

export default DescriptionBox;