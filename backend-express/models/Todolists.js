module.exports = (sequelize, DataTypes) => {
    const Todolists = sequelize.define("Todolists", {
      task: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    // Users.associate = (models) => {
    //   Users.hasMany(models.Posts, {
    //     onDelete: "cascade",
    //   });
    // };
    return Todolists;
  };