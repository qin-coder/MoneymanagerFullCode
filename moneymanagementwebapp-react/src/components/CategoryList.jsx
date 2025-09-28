import { Layers2, Pencil } from 'lucide-react'
const CategoryList = ({ categories, onEditCategory }) => {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Category Sources</h4>
      </div>
      {/** Category List */}
      {categories.length === 0 ? (
        <p className="text-gray-500">
          No categories added yet, and some to get start{' '}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100"
            >
              {/* Icon/emoji display */}
              <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                {category.icon ? (
                  <span className="text-2xl">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-5 h-5"
                    />
                  </span>
                ) : (
                  <Layers2 size={24} className="text-primary text-purple-800" />
                )}
              </div>
              {/* categpry details */}
              <div className="flex-1 flex items-center justify-between">
                {/* categpry name and type */}
                <p className="font-medium text-gray-800 text-lg ">
                  {category.name}
                </p>
                <p className="text-lg text-gray-500 mt-1 capitalize">
                  {category.type}
                </p>
              </div>
              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEditCategory(category)}
                  className="text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Pencil size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryList
