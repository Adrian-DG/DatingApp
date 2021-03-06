using System.Threading.Tasks;
using API.Interfaces;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using CloudinaryDotNet;
using Microsoft.Extensions.Options;
using API.Helpers;

namespace API.Services
{
    public class PhotoService : IPhotoService
{
        private readonly Cloudinary _cloudinary;
        public PhotoService(IOptions<CloudinarySettings> config)
        {
            var cloud = config.Value;
            var account = new CloudinaryDotNet.Account(cloud.CloudName, cloud.ApiKey, cloud.ApiSecret);
            // var acc = new CloudinaryDotNet.Account(cloud.CloudName, cloud.ApiKey, cloud.ApiSecret);
             _cloudinary = new Cloudinary(account);
        }

        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if(file.Length > 0) 
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream), 
                    Transformation = new Transformation()
                        .Height(500)
                        .Width(500)
                        .Crop("fill")
                        .Gravity("face")
                };

                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }

            return uploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        { 
            var deleteParams = new DeletionParams(publicId);
            return await _cloudinary.DestroyAsync(deleteParams);
        }
    }
}