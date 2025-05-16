const imageProvider = require('../providers/images.providers');


const fetchAllImages = async () => {
  const images = await imageProvider.getImagesFromDb();
  return images;
};

const handleUpload = async (req) => {
  const { type, courtId, clubId } = req.body;

  /*if (type === 'court' && !courtId) {
    throw new Error('CourtId is required for court images');
  }

  if (type === 'court') {
    const courtExists = await courtProvider.findCourtById(courtId);
    if (!courtExists) {
      throw new Error(`Court with id ${courtId} does not exist`);
    }
  }
*/
  const imageData = {
    url: `/uploads/${req.file.filename}`,
    type,
    CourtId: type === 'court' ? courtId : null,
    ClubId: type === 'club' ? clubId : null,
  };

  const newImage = await imageProvider.createImage(imageData);

  return newImage;
};

module.exports = { fetchAllImages, handleUpload };
