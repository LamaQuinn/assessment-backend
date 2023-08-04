const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn=document.getElementById('fortuneBtn')
const fortuneText = document.getElementById('fortuneText')

//post
const customFortuneInput = document.getElementById("customFortuneInput")
const addFortuneBtn = document.getElementById("addFortuneBtn")
const customFortuneStatus = document.getElementById("customFortuneStatus")

//put
const fortuneSelectUpdate = document.getElementById("fortuneSelectUpdate");
const updatedFortuneInput = document.getElementById("updatedFortuneInput");
const updateFortuneBtn = document.getElementById("updateFortuneBtn");
const updateFortuneStatus = document.getElementById("updateFortuneStatus");

//delete
const fortuneSelectDelete=document.getElementById('fortuneSelectDelete')
const deleteFortuneBtn=document.getElementById('deleteFortuneBtn')
const deleteFortuneStatus=document.getElementById('deleteFortuneStatus')

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

function populateFortunesSelect(fortunes) {
    fortuneSelectUpdate.innerHTML = ""

    if (Array.isArray(fortunes)) {
        fortunes.forEach((fortune) => {
          const option = document.createElement("option");
          option.value = fortune;
          option.innerText = fortune;
          fortuneSelectUpdate.appendChild(option);
        // fortuneSelectDelete.appendChild(option)
        });
      } else if (typeof fortunes === "string") {
        const option = document.createElement("option");
        option.value = fortunes;
        option.innerText = fortunes;
        fortuneSelectUpdate.appendChild(option);
        // fortuneSelectDelete.appendChild(option)
      }
  }

  

const getFortuneMessage = ()=>{
    axios
        .get("http://localhost:4000/api/get-fortune")
        .then((res)=>{
            fortuneText.textContent=res.data
            
            populateFortunesSelect(res.data);
        })
        .catch((err)=>{
            console.error(err)
         })
}

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click',getFortuneMessage)




////////////////////////////////////////////////////////////



addFortuneBtn.addEventListener("click", () => {
    const customFortune = customFortuneInput.value.trim();
    if (!customFortune) {
      customFortuneStatus.textContent = "Please enter a fortune.";
      return;
    }
  
    axios.post("http://localhost:4000/api/add-fortune", { fortune: customFortune })
      .then((res) => {
         const data = res.data;
        customFortuneStatus.textContent = data.message
        // console.log(data)
        customFortuneInput.value = "";
         
        // axios.get("http://localhost:4000/api/get-fortune")
        // .then((res) => {
        //   populateFortunesSelect(res.data);
        // })
        // .catch((error) => {
        //   console.error("Error fetching fortunes:", error);
        // });

      })
      .catch((error) => {
        console.error("Error adding custom fortune:", error);
      });
  });



// ----------------------------------------------------------- To use update function first click get mt fortune button then u ll be able to pick existed fortune to edit it 
  updateFortuneBtn.addEventListener("click", () => {
    const selectedFortune = fortuneSelectUpdate.value.trim();
    const updatedFortune = updatedFortuneInput.value.trim();
    if (!selectedFortune || !updatedFortune) {
      updateFortuneStatus.textContent = "Please select a fortune and enter the updated message.";
      return;
    }
  
    axios.put("http://localhost:4000/api/update-fortune", { oldFortune: selectedFortune, newFortune: updatedFortune })
      .then(() => {
        updateFortuneStatus.textContent = "Fortune updated successfully!";
        updatedFortuneInput.value = "";
        
      })
      .catch((error) => {
        console.error("Error updating fortune:", error);
      });
  });




//  -----------------------------
deleteFortuneBtn.addEventListener("click", () => {
    const fortuneToDelete = fortuneSelectDelete.value.trim();
    if (!fortuneToDelete) {
      deleteFortuneStatus.textContent = "Please enter a fortune to delete.";
      return;
    }
  
    axios.delete("http://localhost:4000/api/delete-fortune", { data: { fortuneToDelete } })
      .then((res) => {
        const data = res.data;
        deleteFortuneStatus.textContent = data.message;
        fortuneSelectDelete.value = "";
        // Refresh the fortune select options after deleting the fortune
        axios.get("/get-fortune")
          .then((res) => {
            populateFortunesSelect(res.data);
          })
          .catch((error) => {
            console.error("Error fetching fortunes:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting fortune:", error);
      });
  });