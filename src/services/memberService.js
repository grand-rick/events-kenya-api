const Member = require("../database/Member");
const { v4: uuid } = require("uuid");

const getAllMembers = () => {
  try {
    const allMembers = Member.getAllMembers();
    return allMembers;
  } catch (error) {
    throw error;
  }
};

const getOneMember = (memberId) => {
  try {
    const member = Member.getOneMember(memberId);

    return member;
  } catch (error) {
    throw error;
  }
};

const createMember = (memberDetails) => {
  try {
    const newMember = Member.createMember({
      id: uuid(),
      ...memberDetails,
    });

    return newMember;
  } catch (error) {
    throw error;
  }
};

const updateMember = (memberId, memberForUpdate) => {
  try {
    const updatedMember = Member.updateMember(memberId, memberForUpdate);

    return updatedMember;
  } catch (error) {
    throw error;
  }
};

const deleteMember = (memberId) => {
  try {
    const deletedMember = Member.deleteMember(memberId);
    return deletedMember;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllMembers,
  getOneMember,
  createMember,
  updateMember,
  deleteMember,
};
