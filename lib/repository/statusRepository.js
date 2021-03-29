export var Status;
(function (Status) {
    Status[Status["Verified"] = 0] = "Verified";
    Status[Status["Unverified"] = 1] = "Unverified";
})(Status || (Status = {}));
export const getStatusByFullName = (_name) => {
    throw new Error('Database Connection needed');
};
//# sourceMappingURL=statusRepository.js.map