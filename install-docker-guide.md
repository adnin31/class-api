# How to Install Docker on Any OS

## Windows

### **1️⃣ Download and Install Docker Desktop**
- Visit [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/).
- Download the installer and run it.
- Follow the setup instructions.
- Restart your computer if prompted.

### **2️⃣ Verify Installation**
- Open **PowerShell** or **Command Prompt** and run:
  ```sh
  docker --version
  ```
  Expected output:
  ```sh
  Docker version XX.XX.XX, build XXXXXXX
  ```

### **3️⃣ Enable WSL 2 Backend (Recommended)**
- Open PowerShell as Admin and run:
  ```sh
  wsl --install
  ```
- Ensure WSL 2 is set as the default backend:
  ```sh
  wsl --set-default-version 2
  ```

---

## macOS

### **1️⃣ Install Docker Desktop**
- Visit [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/).
- Download and install the `.dmg` file.
- Open Docker Desktop and follow the setup steps.

### **2️⃣ Verify Installation**
- Open **Terminal** and run:
  ```sh
  docker --version
  ```
  Expected output:
  ```sh
  Docker version XX.XX.XX, build XXXXXXX
  ```

---

## Linux (Ubuntu/Debian)

### **1️⃣ Update System and Install Dependencies**
```sh
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg
```

### **2️⃣ Add Docker’s GPG Key and Repository**
```sh
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker.asc > /dev/null
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### **3️⃣ Install Docker Engine**
```sh
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### **4️⃣ Verify Installation**
```sh
docker --version
```
Expected output:
```sh
Docker version XX.XX.XX, build XXXXXXX
```

### **5️⃣ Enable and Start Docker Service**
```sh
sudo systemctl enable docker
sudo systemctl start docker
```

### **6️⃣ Allow Running Docker Without `sudo` (Optional)**
```sh
sudo usermod -aG docker $USER
newgrp docker
```

---

## **Testing Docker Installation**
Run the following command on **any OS** to verify Docker is working:
```sh
docker run hello-world
```
If Docker is installed correctly, you will see a message saying:
```
Hello from Docker!
```

