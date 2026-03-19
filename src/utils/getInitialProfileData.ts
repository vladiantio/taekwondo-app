const DEFAULT_PROFILE_DATA = {
	name: "Estela Martínez",
	license: "123456",
	email: "example@example.com",
	password: "123456",
	avatar: "",
};

export function getInitialProfileData() {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
        const parsed = JSON.parse(savedData);
        const merged = { ...DEFAULT_PROFILE_DATA, ...parsed };
        localStorage.setItem("profileData", JSON.stringify(merged));
        return merged;
    }
    localStorage.setItem("profileData", JSON.stringify(DEFAULT_PROFILE_DATA));
    return DEFAULT_PROFILE_DATA;
}