const Member = require("../services/memberService");

const getAllMembers = (req, res) => {
  try {
    const allMembers = Member.getAllMembers();
    res.status(200).json({
      status: "success",
      data: {
        members: allMembers,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: "fail",
      message: error.message || error,
    });
  }
};

const getOneMember = (req, res) => {
  try {
    const { memberId } = req.params;

    if (!memberId) {
      throw {
        status: 400,
        message: "Please provide a memberId",
      };
    }

    const member = Member.getOneMember(memberId);
    res.status(200).json({
      status: "success",
      data: {
        member,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: "fail",
      message: error.message || error,
    });
  }
};

const createMember = (req, res) => {
  try {
    const { name, email, eventId } = req.body;

    if (!name || !email || !eventId) {
      throw {
        status: 400,
        message: "Please provide name, email, and eventId",
      };
    }

    const newMember = Member.createMember({
      name,
      email,
      eventId,
    });

    res.status(201).json({
      status: "success",
      data: {
        member: newMember,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: "fail",
      message: error.message || error,
    });
  }
};

const updateMember = (req, res) => {
  try {
    const { memberId } = req.params;
    const updatedMember = Member.updateMember(memberId, req.body);
    res.status(200).json({
      status: "success",
      data: {
        member: updatedMember,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: "fail",
      message: error.message || error,
    });
  }
};

const deleteMember = (req, res) => {
  try {
    const { memberId } = req.params;
    const deletedMember = Member.deleteMember(memberId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: "fail",
      message: error.message || error,
    });
  }
};

module.exports = {
  getAllMembers,
  getOneMember,
  createMember,
  updateMember,
  deleteMember,
};
