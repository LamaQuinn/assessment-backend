const customFortunes = []
const fortunes = [
    "A lifetime of happiness lies ahead of you.",
    "In order to take, one must first give.",
    "Never fear! The end of something marks the start of something new.",
    "People find it difficult to resist your persuasive manner.",
    "Smile when you are ready."
  ]
module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortuneMessage:(req,res)=>{
      
          let randomValue = Math.floor(Math.random()*fortunes.length)
          let randomFortune=fortunes[randomValue]

          res.status(200).send(randomFortune)
    },
    addFortune:(req,res)=>{
    const { fortune } = req.body;
    if (!fortune) {
    return res.status(400).json({ error: "Please provide a fortune." });
  }

  customFortunes.push(fortune);
  console.log(req.body)
  res.status(200).json({ message: "Custom fortune added successfully." });
    },
    updateFortune:(req,res)=>{
        const { oldFortune, newFortune } = req.body;
        if (!oldFortune || !newFortune) {
          return res.status(400).json({ error: "Please provide both the old and updated fortunes." });
        }
      
        const index = fortunes.indexOf(oldFortune);
        if (index === -1) {
          return res.status(404).json({ error: "The selected fortune was not found." });
        }
      
        fortunes[index] = newFortune;
        res.json({ message: "Fortune updated successfully." });
    },
    deleteFortune:(req,res)=>{
        const { fortuneToDelete } = req.body;
        if (!fortuneToDelete) {
          return res.status(400).json({ error: "Please provide a fortune to delete." });
        }
      
        // Find and remove the selected fortune from the array
        const index = fortunes.indexOf(fortuneToDelete);
        if (index !== -1) {
          fortunes.splice(index, 1);
          res.status(200).json({ message: "Fortune deleted successfully." });
        } else {
          res.status(404).json({ error: "Fortune not found." });
        }
    }

}