function findWeaponData (weaponData, weaponName) {
    let weapon =""
    for (let i = 0; i < weaponData.data.length; i++) {
        if (weaponData.data[i].displayName.toUpperCase() === weaponName.toUpperCase()) {
            weapon = weaponData.data[i]
            break;
        }
    }

    if (weapon) {
        document.querySelector(".weaponMainPortrait").src = weapon.displayIcon;
        document.querySelector('#weaponNameDisplay').innerText = weapon.displayName
        document.querySelector('#magazineSize').innerText = `Magazine size: ${JSON.stringify(weapon.weaponStats.magazineSize)} bullets`;
        document.querySelector('#fireRate').innerText = `Fire rate: ${JSON.stringify(weapon.weaponStats.fireRate)} bullets per second`;
        document.querySelector('#reloadTime').innerText = `Reload time: ${JSON.stringify(weapon.weaponStats.reloadTimeSeconds)} seconds`;
        document.querySelector('#firstBulletAccuracy').innerText = `First bullet accuracy: ${JSON.stringify(weapon.weaponStats.firstBulletAccuracy)}`;
    }
}

function weaponImageGrid (weaponData, weaponName) {
    let weapon = ""
    for (let i = 0; i < weaponData.data.length; i++) {
        if (weaponData.data[i].displayName.toUpperCase() === weaponName.toUpperCase()) {
            weapon = weaponData.data[i]
            break;
        }
    }

    if (weapon) {
        document.querySelector(`#${weapon.displayName}BuyImage`).src = weapon.shopData.newImage;
        document.querySelector(`#${weapon.displayName}Cost`).innerText = weapon.shopData.cost;
        if (weapon.displayName === 'Classic') {
            document.querySelector(`#${weapon.displayName}Cost`).innerText = 'FREE';
        }
    }
}

export function defaultGunLoad (weaponName) {
    fetch("https://valorant-api.com/v1/weapons")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const weaponData = data;
        let weapon =""
        for (let i = 0; i < weaponData.data.length; i++) {
            if (weaponData.data[i].displayName.toUpperCase() === weaponName.toUpperCase()) {
                weapon = weaponData.data[i]
                break;
            }
        }

        if (weapon) {
            document.querySelector(".weaponMainPortrait").src = weapon.displayIcon;
            document.querySelector('#weaponNameDisplay').innerText = weapon.displayName
            document.querySelector('#magazineSize').innerText = `Magazine size: ${JSON.stringify(weapon.weaponStats.magazineSize)} bullets`;
            document.querySelector('#fireRate').innerText = `Fire rate: ${JSON.stringify(weapon.weaponStats.fireRate)} bullets per second`;
            document.querySelector('#reloadTime').innerText = `Reload time: ${JSON.stringify(weapon.weaponStats.reloadTimeSeconds)} seconds`;
            document.querySelector('#firstBulletAccuracy').innerText = `First bullet accuracy: ${JSON.stringify(weapon.weaponStats.firstBulletAccuracy)}`;
        }
    })
}

export function weaponDataFetch(weaponNames) {
    fetch("https://valorant-api.com/v1/weapons")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const weaponData = data;
            weaponNames.forEach(function (weaponName) {
                weaponIconListener(weaponName, weaponData);
                weaponImageGrid(weaponData, weaponName);
            });
        });
}

let selectedWeapon = null;
let previousWeaponCost = null;

export function weaponIconListener(weaponName, weaponData) {
    const weaponIcon = document.querySelector(`#${weaponName}Item`);
    weaponIcon?.addEventListener("click", function (e) {
        e.preventDefault();
        if (selectedWeapon === weaponName) {
            return;
        }
        if (selectedWeapon) {
            const previousWeaponIcon = document.querySelector(`#${selectedWeapon}Item`);
            previousWeaponIcon.style.filter = "";
            previousWeaponIcon.style.border = "";
            previousWeaponIcon.style.backgroundColor = "";
            document.querySelector(`#${selectedWeapon}Cost`).innerText = previousWeaponCost;
        }
        const pistolNames = ['Classic', 'Frenzy', "Sheriff"];
        const ghostShorty = [ 'Shorty', 'Ghost']
        if (pistolNames.includes(weaponName)) {
            const weaponPortraitContainer = document.querySelector("#weaponPortraitContainer");
            weaponPortraitContainer.classList.remove("pistol2");
            weaponPortraitContainer.classList.add("pistol");
        } else if (ghostShorty.includes(weaponName)) {
            const weaponPortraitContainer = document.querySelector("#weaponPortraitContainer");
            weaponPortraitContainer.classList.remove("pistol");
            weaponPortraitContainer.classList.add("pistol2");
        } else {
            const weaponPortraitContainer = document.querySelector("#weaponPortraitContainer");
            weaponPortraitContainer.classList.remove("pistol");
            weaponPortraitContainer.classList.remove("pistol2");
        }
        selectedWeapon = weaponName;
        const weaponCostText = document.querySelector(`#${weaponName}Cost`);
        previousWeaponCost = weaponCostText.innerText;
        weaponIcon.style.border = "2px solid rgb(70, 204, 159)";
        weaponIcon.style.backgroundColor = "rgba(173, 216, 230, 0.5)"
        weaponCostText.innerText = "OWNED";
        findWeaponData(weaponData, weaponName);
    });
}