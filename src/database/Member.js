const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllMembers = () => {
  try {
    return DB.members;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const getOneMember = (memberId) => {
  try {
    const member = DB.members.find((member) => member.id === memberId);

    if (!member) {
      throw {
        status: 404,
        message: `Could not find member with the id ${memberId}`,
      };
    }

    return member;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const createMember = (memberDetails) => {
  try {
    const isAlreadyAdded =
      DB.members.findIndex((member) => member.id === memberDetails.id) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Member is already added`,
      };
    }

    DB.members.push(memberDetails);
    saveToDatabase(DB);
    return memberDetails;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const updateMember = (memberId, changes) => {
  try {
    const indexForMemberToUpdate = DB.members.findIndex(
      (member) => member.id === memberId
    );

    if (indexForMemberToUpdate === -1) {
      throw {
        status: 404,
        message: `Could not find member with the id ${memberId}`,
      };
    }

    DB.members[indexForMemberToUpdate] = {
      ...DB.members[indexForMemberToUpdate],
      ...changes,
    };

    saveToDatabase(DB);
    return DB.members[indexForMemberToUpdate];
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const deleteMember = (memberId) => {
  try {
    const indexForMemberToDelete = DB.members.findIndex(
      (member) => member.id === memberId
    );

    if (indexForMemberToDelete === -1) {
      throw {
        status: 404,
        message: `Could not find member with the id ${memberId}`,
      };
    }

    const deletedMember = DB.members[indexForMemberToDelete];
    DB.members.splice(indexForMemberToDelete, 1);
    saveToDatabase(DB);
    return deletedMember;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

module.exports = {
  getAllMembers,
  getOneMember,
  createMember,
  updateMember,
  deleteMember,
};
